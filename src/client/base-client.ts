/**
 * Base client for WooCommerce REST API
 *
 * Provides HTTP request methods with OAuth 1.0a authentication
 */

import OAuth from 'oauth-1.0a'
import crypto from 'crypto-js'
import type { WooCommerceConfig, WooCommerceErrorResponse } from '../types/common'
import {
  WooCommerceError,
  WooCommerceAuthenticationError,
  WooCommerceAuthorizationError,
  WooCommerceNotFoundError,
  WooCommerceValidationError,
  WooCommerceRateLimitError,
  WooCommerceNetworkError,
  WooCommerceAPIError,
} from '../errors'
import { buildQueryString, normalizeUrl } from '../utils'

/**
 * Base client for making authenticated requests to WooCommerce API
 */
export class BaseClient {
  protected baseUrl: string
  protected version: string
  protected timeout: number
  protected queryStringAuth: boolean
  private consumerKey: string
  private consumerSecret: string
  private oauth: OAuth | null = null

  constructor(config: WooCommerceConfig) {
    this.baseUrl = normalizeUrl(config.url)
    this.consumerKey = config.consumerKey
    this.consumerSecret = config.consumerSecret
    this.version = config.version || 'wc/v3'
    this.timeout = config.timeout || 30000
    this.queryStringAuth = config.queryStringAuth ?? this.baseUrl.startsWith('https://')

    // Initialize OAuth 1.0a for HTTP connections
    if (!this.queryStringAuth) {
      this.oauth = new OAuth({
        consumer: {
          key: this.consumerKey,
          secret: this.consumerSecret,
        },
        signature_method: 'HMAC-SHA256',
        hash_function: (baseString, key) => {
          return crypto.HmacSHA256(baseString, key).toString(crypto.enc.Base64)
        },
      })
    }
  }

  /**
   * Makes an authenticated HTTP request to the WooCommerce API
   *
   * @param endpoint - API endpoint (without base URL)
   * @param options - Fetch request options
   * @returns Parsed response data
   */
  protected async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseUrl}/wp-json/${this.version}/${endpoint}`
    const method = (options.method || 'GET').toUpperCase()

    // Build request URL with authentication
    let requestUrl = url
    const requestData: OAuth.RequestOptions = {
      url,
      method,
    }

    if (this.queryStringAuth) {
      // Query string auth for HTTPS
      const separator = url.includes('?') ? '&' : '?'
      requestUrl = `${url}${separator}consumer_key=${encodeURIComponent(
        this.consumerKey
      )}&consumer_secret=${encodeURIComponent(this.consumerSecret)}`
    } else if (this.oauth) {
      // OAuth 1.0a signature for HTTP
      const authHeader = this.oauth.toHeader(this.oauth.authorize(requestData))
      options.headers = {
        ...options.headers,
        Authorization: authHeader.Authorization,
      }
    }

    // Set default headers
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'User-Agent': 'WooCommerce-SDK/1.0',
      ...(options.headers as Record<string, string>),
    }

    // Create abort controller for timeout
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), this.timeout)

    try {
      const response = await fetch(requestUrl, {
        ...options,
        headers,
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      // Handle non-2xx responses
      if (!response.ok) {
        await this.handleErrorResponse(response)
      }

      // Handle 204 No Content
      if (response.status === 204) {
        return {} as T
      }

      // Parse JSON response
      const data = await response.json()
      return data as T
    } catch (error) {
      clearTimeout(timeoutId)

      // Handle network errors
      if (error instanceof Error) {
        const normalizedMessage = error.message.toLowerCase()
        if (error.name === 'AbortError') {
          throw new WooCommerceNetworkError('Request timeout', error)
        }
        if (
          normalizedMessage.includes('fetch') ||
          normalizedMessage.includes('network') ||
          normalizedMessage.includes('econnrefused')
        ) {
          throw new WooCommerceNetworkError('Network request failed', error)
        }
      }

      // Re-throw if already a WooCommerce error
      if (error instanceof WooCommerceError) {
        throw error
      }

      // Generic error
      throw new WooCommerceError(error instanceof Error ? error.message : 'Unknown error occurred')
    }
  }

  /**
   * Handles error responses from the API
   *
   * @param response - Fetch response object
   */
  private async handleErrorResponse(response: Response): Promise<never> {
    let errorData: WooCommerceErrorResponse | undefined

    try {
      errorData = (await response.json()) as WooCommerceErrorResponse
    } catch {
      // Response body is not JSON
    }

    const message = errorData?.message || response.statusText || 'Request failed'

    switch (response.status) {
      case 401:
        throw new WooCommerceAuthenticationError(message, errorData)

      case 403:
        throw new WooCommerceAuthorizationError(message, errorData)

      case 404:
        throw new WooCommerceNotFoundError(message, errorData)

      case 400:
      case 422:
        throw new WooCommerceValidationError(
          message,
          response.status,
          errorData,
          errorData?.data?.params
        )

      case 429: {
        const retryAfter = response.headers.get('retry-after')
        throw new WooCommerceRateLimitError(
          message,
          errorData,
          retryAfter ? parseInt(retryAfter, 10) : undefined
        )
      }

      default:
        if (response.status >= 500) {
          throw new WooCommerceAPIError(message, response.status, errorData)
        }
        throw new WooCommerceError(message, response.status, errorData)
    }
  }

  /**
   * Makes a GET request to the API
   *
   * @param endpoint - API endpoint
   * @param params - Query parameters
   * @returns Parsed response data
   */
  protected async get<T>(endpoint: string, params?: Record<string, any>): Promise<T> {
    let url = endpoint

    if (params && Object.keys(params).length > 0) {
      const queryString = buildQueryString(params)
      url = `${endpoint}${endpoint.includes('?') ? '&' : '?'}${queryString}`
    }

    return this.request<T>(url, { method: 'GET' })
  }

  /**
   * Makes a POST request to the API
   *
   * @param endpoint - API endpoint
   * @param body - Request body
   * @returns Parsed response data
   */
  protected async post<T>(endpoint: string, body?: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: body ? JSON.stringify(body) : undefined,
    })
  }

  /**
   * Makes a PUT request to the API
   *
   * @param endpoint - API endpoint
   * @param body - Request body
   * @returns Parsed response data
   */
  protected async put<T>(endpoint: string, body?: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: body ? JSON.stringify(body) : undefined,
    })
  }

  /**
   * Makes a DELETE request to the API
   *
   * @param endpoint - API endpoint
   * @param params - Query parameters (e.g., { force: true })
   * @returns Parsed response data
   */
  protected async delete<T>(endpoint: string, params?: Record<string, any>): Promise<T> {
    let url = endpoint

    if (params && Object.keys(params).length > 0) {
      const queryString = buildQueryString(params)
      url = `${endpoint}${endpoint.includes('?') ? '&' : '?'}${queryString}`
    }

    return this.request<T>(url, { method: 'DELETE' })
  }

  /**
   * Makes a PATCH request to the API (used for batch operations)
   *
   * @param endpoint - API endpoint
   * @param body - Request body
   * @returns Parsed response data
   */
  protected async patch<T>(endpoint: string, body?: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST', // WooCommerce uses POST for batch operations
      body: body ? JSON.stringify(body) : undefined,
    })
  }
}
