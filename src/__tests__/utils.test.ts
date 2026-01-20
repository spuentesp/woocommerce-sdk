/**
 * Tests for utility functions
 */

import { describe, it, expect } from 'vitest'
import {
  buildQueryString,
  sleep,
  retryWithBackoff,
  normalizeUrl,
  parsePaginationHeaders,
} from '../utils'

describe('Utility functions', () => {
  describe('buildQueryString', () => {
    it('should build query string from object', () => {
      const params = {
        page: 1,
        per_page: 50,
        status: 'publish',
      }

      const result = buildQueryString(params)

      expect(result).toContain('page=1')
      expect(result).toContain('per_page=50')
      expect(result).toContain('status=publish')
    })

    it('should handle array parameters with bracket notation', () => {
      const params = {
        include: [1, 2, 3],
      }

      const result = buildQueryString(params)

      expect(result).toContain('include%5B%5D=1') // include[]=1
      expect(result).toContain('include%5B%5D=2') // include[]=2
      expect(result).toContain('include%5B%5D=3') // include[]=3
    })

    it('should handle object parameters as JSON', () => {
      const params = {
        meta_data: { key: 'custom_field', value: 'test' },
      }

      const result = buildQueryString(params)

      expect(result).toContain('meta_data=')
      expect(result).toContain('%7B') // {
    })

    it('should skip undefined and null values', () => {
      const params = {
        page: 1,
        search: undefined,
        filter: null,
      }

      const result = buildQueryString(params)

      expect(result).toBe('page=1')
      expect(result).not.toContain('search')
      expect(result).not.toContain('filter')
    })

    it('should handle empty object', () => {
      const result = buildQueryString({})

      expect(result).toBe('')
    })

    it('should properly encode special characters', () => {
      const params = {
        search: 'test & value',
        email: 'user@example.com',
      }

      const result = buildQueryString(params)

      expect(result).toContain('search=test%20%26%20value')
      expect(result).toContain('email=user%40example.com')
    })
  })

  describe('sleep', () => {
    it('should delay execution', async () => {
      const start = Date.now()
      await sleep(100)
      const end = Date.now()

      const elapsed = end - start
      expect(elapsed).toBeGreaterThanOrEqual(95) // Allow small variance
      expect(elapsed).toBeLessThan(150)
    })
  })

  describe('retryWithBackoff', () => {
    it('should return result on first success', async () => {
      const fn = async () => 'success'

      const result = await retryWithBackoff(fn)

      expect(result).toBe('success')
    })

    it('should retry on failure and eventually succeed', async () => {
      let attempts = 0

      const fn = async () => {
        attempts++
        if (attempts < 3) {
          throw new Error('Temporary failure')
        }
        return 'success'
      }

      const result = await retryWithBackoff(fn, 3, 10)

      expect(result).toBe('success')
      expect(attempts).toBe(3)
    })

    it('should throw error after max retries', async () => {
      const fn = async () => {
        throw new Error('Persistent failure')
      }

      await expect(retryWithBackoff(fn, 2, 10)).rejects.toThrow('Persistent failure')
    })

    it('should use exponential backoff delays', async () => {
      const delays: number[] = []
      let attempts = 0

      const fn = async () => {
        attempts++
        if (attempts < 4) {
          throw new Error('Failure')
        }
        return 'success'
      }

      const start = Date.now()
      await retryWithBackoff(fn, 3, 100)
      const end = Date.now()

      const totalTime = end - start
      // Expected delays: 100ms, 200ms, 400ms = 700ms total
      expect(totalTime).toBeGreaterThanOrEqual(650)
      expect(totalTime).toBeLessThan(850)
    })
  })

  describe('normalizeUrl', () => {
    it('should add https:// if no protocol', () => {
      const result = normalizeUrl('example.com')

      expect(result).toBe('https://example.com')
    })

    it('should remove trailing slash', () => {
      const result = normalizeUrl('https://example.com/')

      expect(result).toBe('https://example.com')
    })

    it('should preserve http:// protocol', () => {
      const result = normalizeUrl('http://example.com')

      expect(result).toBe('http://example.com')
    })

    it('should handle URLs with paths', () => {
      const result = normalizeUrl('https://example.com/store/')

      expect(result).toBe('https://example.com/store')
    })

    it('should handle already normalized URLs', () => {
      const result = normalizeUrl('https://example.com')

      expect(result).toBe('https://example.com')
    })
  })

  describe('parsePaginationHeaders', () => {
    it('should parse pagination headers', () => {
      const headers = new Headers({
        'x-wp-total': '150',
        'x-wp-totalpages': '15',
      })

      const result = parsePaginationHeaders(headers)

      expect(result.total).toBe(150)
      expect(result.totalPages).toBe(15)
    })

    it('should default to 0 if headers are missing', () => {
      const headers = new Headers({})

      const result = parsePaginationHeaders(headers)

      expect(result.total).toBe(0)
      expect(result.totalPages).toBe(0)
    })

    it('should handle invalid numeric values', () => {
      const headers = new Headers({
        'x-wp-total': 'invalid',
        'x-wp-totalpages': 'invalid',
      })

      const result = parsePaginationHeaders(headers)

      expect(result.total).toBeNaN()
      expect(result.totalPages).toBeNaN()
    })
  })
})
