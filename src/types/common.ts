/**
 * Common types and interfaces shared across the WooCommerce SDK
 */

/**
 * WooCommerce API configuration
 */
export interface WooCommerceConfig {
  /**
   * Store URL (e.g., 'https://example.com')
   */
  url: string

  /**
   * Consumer key for OAuth 1.0a
   */
  consumerKey: string

  /**
   * Consumer secret for OAuth 1.0a
   */
  consumerSecret: string

  /**
   * API version (default: 'wc/v3')
   */
  version?: string

  /**
   * Request timeout in milliseconds (default: 30000)
   */
  timeout?: number

  /**
   * Enable query string auth for HTTPS (default: false)
   * Note: OAuth 1.0a signing is used for HTTP, query string for HTTPS
   */
  queryStringAuth?: boolean
}

/**
 * Paginated response from WooCommerce API
 */
export interface WooCommercePaginatedResponse<T> {
  /**
   * Array of items
   */
  data: T[]

  /**
   * Pagination metadata from response headers
   */
  headers: {
    /**
     * Total number of items available
     */
    'x-wp-total'?: string

    /**
     * Total number of pages available
     */
    'x-wp-totalpages'?: string
  }
}

/**
 * Common list parameters for paginated endpoints
 */
export interface ListParams {
  /**
   * Scope under which the request is made (default: 'all')
   */
  context?: 'view' | 'edit'

  /**
   * Current page of the collection (default: 1)
   */
  page?: number

  /**
   * Maximum number of items to return (default: 10, max: 100)
   */
  per_page?: number

  /**
   * Limit results to those matching a string
   */
  search?: string

  /**
   * Ensure result set excludes specific IDs
   */
  exclude?: number[]

  /**
   * Limit result set to specific IDs
   */
  include?: number[]

  /**
   * Offset the result set by a specific number of items
   */
  offset?: number

  /**
   * Order sort attribute ascending or descending (default: 'desc')
   */
  order?: 'asc' | 'desc'

  /**
   * Sort collection by object attribute
   */
  orderby?: string
}

/**
 * Image object structure used across products, variations, categories
 */
export interface WooCommerceImage {
  /**
   * Image ID
   */
  id: number

  /**
   * Date image was created (GMT)
   */
  date_created: string

  /**
   * Date image was created (site's timezone)
   */
  date_created_gmt: string

  /**
   * Date image was last modified (GMT)
   */
  date_modified: string

  /**
   * Date image was last modified (site's timezone)
   */
  date_modified_gmt: string

  /**
   * Image URL
   */
  src: string

  /**
   * Image name
   */
  name: string

  /**
   * Image alternative text
   */
  alt: string
}

/**
 * Dimensions object for products
 */
export interface Dimensions {
  /**
   * Product length
   */
  length: string

  /**
   * Product width
   */
  width: string

  /**
   * Product height
   */
  height: string
}

/**
 * Category reference object
 */
export interface CategoryRef {
  /**
   * Category ID
   */
  id: number

  /**
   * Category name
   */
  name: string

  /**
   * Category slug
   */
  slug: string
}

/**
 * Tag reference object
 */
export interface TagRef {
  /**
   * Tag ID
   */
  id: number

  /**
   * Tag name
   */
  name: string

  /**
   * Tag slug
   */
  slug: string
}

/**
 * Meta data object for custom fields
 */
export interface MetaData {
  /**
   * Meta ID
   */
  id: number

  /**
   * Meta key
   */
  key: string

  /**
   * Meta value
   */
  value: string | number | boolean | object

  /**
   * Display key (optional, for display purposes)
   */
  display_key?: string

  /**
   * Display value (optional, for display purposes)
   */
  display_value?: string
}

/**
 * Address object for billing and shipping
 */
export interface Address {
  /**
   * First name
   */
  first_name: string

  /**
   * Last name
   */
  last_name: string

  /**
   * Company name
   */
  company: string

  /**
   * Address line 1
   */
  address_1: string

  /**
   * Address line 2
   */
  address_2: string

  /**
   * City name
   */
  city: string

  /**
   * State/Province code
   */
  state: string

  /**
   * Postal/ZIP code
   */
  postcode: string

  /**
   * Country code (ISO 3166-1 alpha-2)
   */
  country: string

  /**
   * Email address (billing only)
   */
  email?: string

  /**
   * Phone number (billing only)
   */
  phone?: string
}

/**
 * Links object for HATEOAS
 */
export interface Links {
  self?: Array<{ href: string }>
  collection?: Array<{ href: string }>
  up?: Array<{ href: string }>
}

/**
 * Error response from WooCommerce API
 */
export interface WooCommerceErrorResponse {
  /**
   * Error code
   */
  code: string

  /**
   * Error message
   */
  message: string

  /**
   * Additional error data
   */
  data?: {
    status: number
    params?: Record<string, string>
    details?: Record<string, unknown>
  }
}
