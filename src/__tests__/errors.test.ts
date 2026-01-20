/**
 * Tests for error classes
 */

import { describe, it, expect } from 'vitest'
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

describe('Error classes', () => {
  describe('WooCommerceError', () => {
    it('should create base error', () => {
      const error = new WooCommerceError('Test error')

      expect(error).toBeInstanceOf(Error)
      expect(error).toBeInstanceOf(WooCommerceError)
      expect(error.message).toBe('Test error')
      expect(error.name).toBe('WooCommerceError')
    })

    it('should include status code', () => {
      const error = new WooCommerceError('Test error', 400)

      expect(error.statusCode).toBe(400)
    })

    it('should include response data', () => {
      const response = {
        code: 'error_code',
        message: 'Error message',
        data: { status: 400 },
      }

      const error = new WooCommerceError('Test error', 400, response)

      expect(error.response).toEqual(response)
    })
  })

  describe('WooCommerceAuthenticationError', () => {
    it('should create authentication error with default message', () => {
      const error = new WooCommerceAuthenticationError()

      expect(error).toBeInstanceOf(WooCommerceError)
      expect(error).toBeInstanceOf(WooCommerceAuthenticationError)
      expect(error.message).toBe('Authentication failed')
      expect(error.name).toBe('WooCommerceAuthenticationError')
      expect(error.statusCode).toBe(401)
    })

    it('should create authentication error with custom message', () => {
      const error = new WooCommerceAuthenticationError('Invalid credentials')

      expect(error.message).toBe('Invalid credentials')
    })
  })

  describe('WooCommerceAuthorizationError', () => {
    it('should create authorization error with default message', () => {
      const error = new WooCommerceAuthorizationError()

      expect(error).toBeInstanceOf(WooCommerceError)
      expect(error).toBeInstanceOf(WooCommerceAuthorizationError)
      expect(error.message).toBe('Authorization failed - insufficient permissions')
      expect(error.name).toBe('WooCommerceAuthorizationError')
      expect(error.statusCode).toBe(403)
    })
  })

  describe('WooCommerceNotFoundError', () => {
    it('should create not found error with default message', () => {
      const error = new WooCommerceNotFoundError()

      expect(error).toBeInstanceOf(WooCommerceError)
      expect(error).toBeInstanceOf(WooCommerceNotFoundError)
      expect(error.message).toBe('Resource not found')
      expect(error.name).toBe('WooCommerceNotFoundError')
      expect(error.statusCode).toBe(404)
    })
  })

  describe('WooCommerceValidationError', () => {
    it('should create validation error with default message', () => {
      const error = new WooCommerceValidationError()

      expect(error).toBeInstanceOf(WooCommerceError)
      expect(error).toBeInstanceOf(WooCommerceValidationError)
      expect(error.message).toBe('Validation failed')
      expect(error.name).toBe('WooCommerceValidationError')
      expect(error.statusCode).toBe(400)
    })

    it('should include validation errors', () => {
      const errors = {
        name: 'Name is required',
        email: 'Invalid email format',
      }

      const error = new WooCommerceValidationError('Validation failed', 400, undefined, errors)

      expect(error.errors).toEqual(errors)
    })

    it('should support 422 status code', () => {
      const error = new WooCommerceValidationError('Unprocessable entity', 422)

      expect(error.statusCode).toBe(422)
    })
  })

  describe('WooCommerceRateLimitError', () => {
    it('should create rate limit error with default message', () => {
      const error = new WooCommerceRateLimitError()

      expect(error).toBeInstanceOf(WooCommerceError)
      expect(error).toBeInstanceOf(WooCommerceRateLimitError)
      expect(error.message).toBe('Rate limit exceeded')
      expect(error.name).toBe('WooCommerceRateLimitError')
      expect(error.statusCode).toBe(429)
    })

    it('should include retry-after value', () => {
      const error = new WooCommerceRateLimitError('Rate limited', undefined, 60)

      expect(error.retryAfter).toBe(60)
    })
  })

  describe('WooCommerceNetworkError', () => {
    it('should create network error with default message', () => {
      const error = new WooCommerceNetworkError()

      expect(error).toBeInstanceOf(WooCommerceError)
      expect(error).toBeInstanceOf(WooCommerceNetworkError)
      expect(error.message).toBe('Network request failed')
      expect(error.name).toBe('WooCommerceNetworkError')
    })

    it('should include original error', () => {
      const originalError = new Error('Connection refused')
      const error = new WooCommerceNetworkError('Network failed', originalError)

      expect(error.originalError).toBe(originalError)
    })
  })

  describe('WooCommerceAPIError', () => {
    it('should create API error with default message', () => {
      const error = new WooCommerceAPIError()

      expect(error).toBeInstanceOf(WooCommerceError)
      expect(error).toBeInstanceOf(WooCommerceAPIError)
      expect(error.message).toBe('WooCommerce API error')
      expect(error.name).toBe('WooCommerceAPIError')
      expect(error.statusCode).toBe(500)
    })

    it('should support different 5xx status codes', () => {
      const error502 = new WooCommerceAPIError('Bad Gateway', 502)
      const error503 = new WooCommerceAPIError('Service Unavailable', 503)

      expect(error502.statusCode).toBe(502)
      expect(error503.statusCode).toBe(503)
    })
  })
})
