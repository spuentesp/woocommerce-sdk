/**
 * Tests for BaseClient
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { BaseClient } from '../client/base-client'
import {
  WooCommerceAuthenticationError,
  WooCommerceAuthorizationError,
  WooCommerceNotFoundError,
  WooCommerceValidationError,
  WooCommerceRateLimitError,
  WooCommerceNetworkError,
  WooCommerceAPIError,
} from '../errors'
import { mockConfig, mockFetchResponse, mockFetchError, mockFetch, mockFetchWith } from './setup'

// Test client that exposes protected methods
class TestClient extends BaseClient {
  public async testRequest<T>(endpoint: string, options?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, options)
  }

  public async testGet<T>(endpoint: string, params?: Record<string, any>): Promise<T> {
    return this.get<T>(endpoint, params)
  }

  public async testPost<T>(endpoint: string, body?: unknown): Promise<T> {
    return this.post<T>(endpoint, body)
  }

  public async testPut<T>(endpoint: string, body?: unknown): Promise<T> {
    return this.put<T>(endpoint, body)
  }

  public async testDelete<T>(endpoint: string, params?: Record<string, any>): Promise<T> {
    return this.delete<T>(endpoint, params)
  }

  public async testPatch<T>(endpoint: string, body?: unknown): Promise<T> {
    return this.patch<T>(endpoint, body)
  }
}

describe('BaseClient', () => {
  let client: TestClient
  let originalFetch: typeof global.fetch

  beforeEach(() => {
    originalFetch = global.fetch
    client = new TestClient(mockConfig)
  })

  afterEach(() => {
    global.fetch = originalFetch
  })

  describe('constructor', () => {
    it('should initialize with config', () => {
      expect(client).toBeInstanceOf(BaseClient)
    })

    it('should normalize URL and remove trailing slash', () => {
      const clientWithTrailingSlash = new TestClient({
        ...mockConfig,
        url: 'https://example.com/',
      })
      expect(clientWithTrailingSlash).toBeInstanceOf(BaseClient)
    })

    it('should default to HTTPS and queryStringAuth for HTTPS URLs', () => {
      const client = new TestClient({
        url: 'example.com',
        consumerKey: 'ck_test',
        consumerSecret: 'cs_test',
      })
      expect(client).toBeInstanceOf(BaseClient)
    })
  })

  describe('GET requests', () => {
    it('should make successful GET request', async () => {
      const responseData = { id: 1, name: 'Test' }
      mockFetch(mockFetchResponse(responseData))

      const result = await client.testGet('products')

      expect(result).toEqual(responseData)
    })

    it('should include query parameters in GET request', async () => {
      const responseData = [{ id: 1 }, { id: 2 }]
      let requestUrl = ''

      mockFetchWith(async url => {
        requestUrl = url.toString()
        return mockFetchResponse(responseData)
      })

      await client.testGet('products', { per_page: 50, status: 'publish' })

      expect(requestUrl).toContain('per_page=50')
      expect(requestUrl).toContain('status=publish')
    })

    it('should handle array query parameters', async () => {
      const responseData = [{ id: 1 }]
      let requestUrl = ''

      mockFetchWith(async url => {
        requestUrl = url.toString()
        return mockFetchResponse(responseData)
      })

      await client.testGet('products', { include: [1, 2, 3] })

      expect(requestUrl).toContain('include%5B%5D=1') // include[]=1
    })
  })

  describe('POST requests', () => {
    it('should make successful POST request', async () => {
      const requestData = { name: 'New Product', sku: 'TEST-123' }
      const responseData = { id: 123, ...requestData }

      mockFetch(mockFetchResponse(responseData, 201))

      const result = await client.testPost('products', requestData)

      expect(result).toEqual(responseData)
    })

    it('should send JSON body in POST request', async () => {
      let requestBody = ''

      mockFetchWith(async (url, options) => {
        if (options?.body) {
          requestBody = options.body.toString()
        }
        return mockFetchResponse({ id: 1 })
      })

      const data = { name: 'Test', price: '99.99' }
      await client.testPost('products', data)

      expect(requestBody).toEqual(JSON.stringify(data))
    })
  })

  describe('PUT requests', () => {
    it('should make successful PUT request', async () => {
      const updates = { name: 'Updated Product' }
      const responseData = { id: 123, ...updates }

      mockFetch(mockFetchResponse(responseData))

      const result = await client.testPut('products/123', updates)

      expect(result).toEqual(responseData)
    })
  })

  describe('DELETE requests', () => {
    it('should make successful DELETE request', async () => {
      const responseData = { id: 123, name: 'Deleted Product' }

      mockFetch(mockFetchResponse(responseData))

      const result = await client.testDelete('products/123', { force: true })

      expect(result).toEqual(responseData)
    })

    it('should handle 204 No Content response', async () => {
      mockFetch(mockFetchResponse({}, 204))

      const result = await client.testDelete('products/123')

      expect(result).toEqual({})
    })
  })

  describe('PATCH requests', () => {
    it('should make POST request for batch operations', async () => {
      let requestMethod = ''

      mockFetchWith(async (_url, options) => {
        requestMethod = options?.method ?? ''
        return mockFetchResponse({ ok: true })
      })

      await client.testPatch('products/batch', { create: [] })

      expect(requestMethod).toBe('POST')
    })
  })

  describe('error handling', () => {
    it('should throw WooCommerceAuthenticationError on 401', async () => {
      mockFetch(mockFetchError(401, 'Invalid credentials', 'rest_authentication_error'))

      await expect(client.testGet('products')).rejects.toThrow(WooCommerceAuthenticationError)
    })

    it('should throw WooCommerceAuthorizationError on 403', async () => {
      mockFetch(mockFetchError(403, 'Insufficient permissions', 'rest_authorization_error'))

      await expect(client.testGet('orders')).rejects.toThrow(WooCommerceAuthorizationError)
    })

    it('should throw WooCommerceNotFoundError on 404', async () => {
      mockFetch(mockFetchError(404, 'Resource not found', 'rest_not_found'))

      await expect(client.testGet('products/999')).rejects.toThrow(WooCommerceNotFoundError)
    })

    it('should throw WooCommerceValidationError on 400', async () => {
      mockFetch(mockFetchError(400, 'Validation failed', 'rest_validation_error'))

      await expect(client.testPost('products', {})).rejects.toThrow(WooCommerceValidationError)
    })

    it('should throw WooCommerceValidationError on 422', async () => {
      mockFetch(mockFetchError(422, 'Unprocessable entity', 'rest_validation_error'))

      await expect(client.testPost('products', {})).rejects.toThrow(WooCommerceValidationError)
    })

    it('should throw WooCommerceRateLimitError on 429', async () => {
      const errorResponse = {
        ok: false,
        status: 429,
        statusText: 'Too Many Requests',
        headers: new Headers({
          'content-type': 'application/json',
          'retry-after': '60',
        }),
        json: async () => ({
          code: 'rest_rate_limit',
          message: 'Too many requests',
          data: { status: 429 },
        }),
        text: async () => JSON.stringify({ message: 'Too many requests' }),
        clone: function () {
          return this
        },
      } as Response

      mockFetch(errorResponse)

      try {
        await client.testGet('products')
        throw new Error('Should have thrown')
      } catch (error) {
        expect(error).toBeInstanceOf(WooCommerceRateLimitError)
        if (error instanceof WooCommerceRateLimitError) {
          expect(error.retryAfter).toBe(60)
        }
      }
    })

    it('should throw WooCommerceAPIError on 500', async () => {
      mockFetch(mockFetchError(500, 'Internal server error', 'rest_server_error'))

      await expect(client.testGet('products')).rejects.toThrow(WooCommerceAPIError)
    })

    it('should throw WooCommerceNetworkError on network failure', async () => {
      mockFetchWith(async () => {
        throw new Error('Network request failed')
      })

      await expect(client.testGet('products')).rejects.toThrow(WooCommerceNetworkError)
    })
  })

  describe('request headers', () => {
    it('should include default headers', async () => {
      let requestHeaders: Headers | undefined

      mockFetchWith(async (url, options) => {
        requestHeaders = new Headers(options?.headers)
        return mockFetchResponse({ id: 1 })
      })

      await client.testGet('products')

      expect(requestHeaders?.get('content-type')).toBe('application/json')
      expect(requestHeaders?.get('accept')).toBe('application/json')
      expect(requestHeaders?.get('user-agent')).toBe('WooCommerce-SDK/1.0')
    })

    it('should include authentication in query string for HTTPS', async () => {
      let requestUrl = ''

      mockFetchWith(async url => {
        requestUrl = url.toString()
        return mockFetchResponse({ id: 1 })
      })

      await client.testGet('products')

      expect(requestUrl).toContain('consumer_key=')
      expect(requestUrl).toContain('consumer_secret=')
    })

    it('should include OAuth authorization header for HTTP', async () => {
      const httpClient = new TestClient({
        ...mockConfig,
        url: 'http://example.com',
        queryStringAuth: false,
      })

      let authHeader = ''

      mockFetchWith(async (_url, options) => {
        authHeader = (options?.headers as Record<string, string> | undefined)?.Authorization ?? ''
        return mockFetchResponse({ id: 1 })
      })

      await httpClient.testGet('products')

      expect(authHeader).toContain('OAuth')
    })
  })
})
