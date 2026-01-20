/**
 * Custom error classes for WooCommerce SDK
 */

import type { WooCommerceErrorResponse } from './types/common'

/**
 * Base error class for all WooCommerce SDK errors
 */
export class WooCommerceError extends Error {
  constructor(
    message: string,
    public readonly statusCode?: number,
    public readonly response?: WooCommerceErrorResponse
  ) {
    super(message)
    this.name = 'WooCommerceError'
    Object.setPrototypeOf(this, WooCommerceError.prototype)
  }
}

/**
 * Error thrown when authentication fails (401)
 */
export class WooCommerceAuthenticationError extends WooCommerceError {
  constructor(message: string = 'Authentication failed', response?: WooCommerceErrorResponse) {
    super(message, 401, response)
    this.name = 'WooCommerceAuthenticationError'
    Object.setPrototypeOf(this, WooCommerceAuthenticationError.prototype)
  }
}

/**
 * Error thrown when authorization fails (403)
 */
export class WooCommerceAuthorizationError extends WooCommerceError {
  constructor(
    message: string = 'Authorization failed - insufficient permissions',
    response?: WooCommerceErrorResponse
  ) {
    super(message, 403, response)
    this.name = 'WooCommerceAuthorizationError'
    Object.setPrototypeOf(this, WooCommerceAuthorizationError.prototype)
  }
}

/**
 * Error thrown when a resource is not found (404)
 */
export class WooCommerceNotFoundError extends WooCommerceError {
  constructor(message: string = 'Resource not found', response?: WooCommerceErrorResponse) {
    super(message, 404, response)
    this.name = 'WooCommerceNotFoundError'
    Object.setPrototypeOf(this, WooCommerceNotFoundError.prototype)
  }
}

/**
 * Error thrown when request validation fails (400, 422)
 */
export class WooCommerceValidationError extends WooCommerceError {
  public readonly errors?: Record<string, string>

  constructor(
    message: string = 'Validation failed',
    statusCode: number = 400,
    response?: WooCommerceErrorResponse,
    errors?: Record<string, string>
  ) {
    super(message, statusCode, response)
    this.name = 'WooCommerceValidationError'
    this.errors = errors
    Object.setPrototypeOf(this, WooCommerceValidationError.prototype)
  }
}

/**
 * Error thrown when rate limit is exceeded (429)
 */
export class WooCommerceRateLimitError extends WooCommerceError {
  public readonly retryAfter?: number

  constructor(
    message: string = 'Rate limit exceeded',
    response?: WooCommerceErrorResponse,
    retryAfter?: number
  ) {
    super(message, 429, response)
    this.name = 'WooCommerceRateLimitError'
    this.retryAfter = retryAfter
    Object.setPrototypeOf(this, WooCommerceRateLimitError.prototype)
  }
}

/**
 * Error thrown when network request fails
 */
export class WooCommerceNetworkError extends WooCommerceError {
  constructor(
    message: string = 'Network request failed',
    public readonly originalError?: Error
  ) {
    super(message)
    this.name = 'WooCommerceNetworkError'
    Object.setPrototypeOf(this, WooCommerceNetworkError.prototype)
  }
}

/**
 * Error thrown when API returns 5xx server error
 */
export class WooCommerceAPIError extends WooCommerceError {
  constructor(
    message: string = 'WooCommerce API error',
    statusCode: number = 500,
    response?: WooCommerceErrorResponse
  ) {
    super(message, statusCode, response)
    this.name = 'WooCommerceAPIError'
    Object.setPrototypeOf(this, WooCommerceAPIError.prototype)
  }
}
