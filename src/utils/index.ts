/**
 * Utility functions for WooCommerce SDK
 */

/**
 * Builds a query string from an object of parameters
 * Arrays are encoded with bracket notation (key[]=value1&key[]=value2)
 *
 * @param params - Object containing query parameters
 * @returns Query string (without leading '?')
 */
export function buildQueryString(params: Record<string, any>): string {
  const queryParts: string[] = []

  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null) {
      continue
    }

    if (Array.isArray(value)) {
      // Array parameters: key[]=value1&key[]=value2
      const arrayKey = `${key}[]`
      for (const item of value) {
        queryParts.push(`${encodeURIComponent(arrayKey)}=${encodeURIComponent(String(item))}`)
      }
    } else if (typeof value === 'object') {
      // Object parameters: convert to JSON string
      queryParts.push(`${encodeURIComponent(key)}=${encodeURIComponent(JSON.stringify(value))}`)
    } else {
      // Scalar parameters
      queryParts.push(`${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`)
    }
  }

  return queryParts.join('&')
}

/**
 * Delays execution for a specified number of milliseconds
 *
 * @param ms - Number of milliseconds to sleep
 * @returns Promise that resolves after the delay
 */
export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * Retries a function with exponential backoff
 *
 * @param fn - Function to retry
 * @param maxRetries - Maximum number of retries (default: 3)
 * @param baseDelay - Base delay in milliseconds (default: 1000)
 * @returns Result of the function
 */
export async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  baseDelay: number = 1000
): Promise<T> {
  let lastError: Error | undefined

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn()
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error))

      if (attempt < maxRetries) {
        const delay = baseDelay * Math.pow(2, attempt)
        await sleep(delay)
      }
    }
  }

  throw lastError
}

/**
 * Normalizes a URL by ensuring it has the correct protocol and no trailing slash
 *
 * @param url - URL to normalize
 * @returns Normalized URL
 */
export function normalizeUrl(url: string): string {
  if (!url) return ''
  // Remove trailing slash
  let normalized = url.replace(/\/$/, '')

  // Ensure protocol
  if (!normalized.startsWith('http://') && !normalized.startsWith('https://')) {
    normalized = `https://${normalized}`
  }

  return normalized
}

/**
 * Parses pagination headers from WooCommerce response
 *
 * @param headers - Response headers
 * @returns Pagination metadata
 */
export function parsePaginationHeaders(headers: Headers): {
  total: number
  totalPages: number
} {
  const total = parseInt(headers.get('x-wp-total') || '0', 10)
  const totalPages = parseInt(headers.get('x-wp-totalpages') || '0', 10)

  return { total, totalPages }
}
