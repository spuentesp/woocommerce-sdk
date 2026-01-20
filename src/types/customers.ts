/**
 * Customer types and interfaces for WooCommerce REST API
 */

import type { Address, MetaData, Links, ListParams } from './common'

/**
 * Customer avatar URLs object
 */
export interface AvatarUrls {
  /**
   * Avatar URL with 24px size
   */
  '24': string

  /**
   * Avatar URL with 48px size
   */
  '48': string

  /**
   * Avatar URL with 96px size
   */
  '96': string
}

/**
 * Complete WooCommerce Customer entity
 */
export interface WooCommerceCustomer {
  /**
   * Unique customer ID (read-only)
   */
  id: number

  /**
   * Date customer was created (GMT, read-only)
   */
  date_created: string

  /**
   * Date customer was created (site timezone, read-only)
   */
  date_created_gmt: string

  /**
   * Date customer was last modified (GMT, read-only)
   */
  date_modified: string

  /**
   * Date customer was last modified (site timezone, read-only)
   */
  date_modified_gmt: string

  /**
   * Customer email address
   */
  email: string

  /**
   * Customer first name
   */
  first_name: string

  /**
   * Customer last name
   */
  last_name: string

  /**
   * Customer role (read-only)
   */
  role: string

  /**
   * Customer login username
   */
  username: string

  /**
   * Customer password (write-only)
   */
  password?: string

  /**
   * Customer billing address
   */
  billing: Address

  /**
   * Customer shipping address
   */
  shipping: Omit<Address, 'email' | 'phone'>

  /**
   * Is customer paying (read-only)
   */
  is_paying_customer: boolean

  /**
   * Avatar URLs object (read-only)
   */
  avatar_url: string

  /**
   * Meta data
   */
  meta_data: MetaData[]

  /**
   * HATEOAS links (read-only)
   */
  _links?: Links
}

/**
 * Customer creation request
 */
export interface CreateCustomerRequest {
  /**
   * Customer email address (required)
   */
  email: string

  /**
   * Customer first name
   */
  first_name?: string

  /**
   * Customer last name
   */
  last_name?: string

  /**
   * Customer login username
   * Note: Cannot be changed after creation
   */
  username?: string

  /**
   * Customer password
   */
  password?: string

  /**
   * Customer billing address
   */
  billing?: Address

  /**
   * Customer shipping address
   */
  shipping?: Omit<Address, 'email' | 'phone'>

  /**
   * Meta data
   */
  meta_data?: Array<{ key: string; value: string | number | boolean }>
}

/**
 * Customer update request
 */
export interface UpdateCustomerRequest {
  /**
   * Customer email address
   */
  email?: string

  /**
   * Customer first name
   */
  first_name?: string

  /**
   * Customer last name
   */
  last_name?: string

  /**
   * Customer password
   */
  password?: string

  /**
   * Customer billing address
   */
  billing?: Address

  /**
   * Customer shipping address
   */
  shipping?: Omit<Address, 'email' | 'phone'>

  /**
   * Meta data
   */
  meta_data?: Array<{ key: string; value: string | number | boolean }>
}

/**
 * Customer list query parameters
 */
export interface ListCustomersParams extends ListParams {
  /**
   * Limit result set to resources with a specific email
   */
  email?: string

  /**
   * Limit result set to resources with a specific role
   */
  role?:
    | string
    | 'all'
    | 'administrator'
    | 'editor'
    | 'author'
    | 'contributor'
    | 'subscriber'
    | 'customer'
    | 'shop_manager'

  /**
   * Sort by attribute
   * Options: 'id', 'include', 'name', 'registered_date'
   */
  orderby?: 'id' | 'include' | 'name' | 'registered_date'
}

/**
 * Batch customer operation
 */
export interface BatchCustomersRequest {
  /**
   * Customers to create
   */
  create?: CreateCustomerRequest[]

  /**
   * Customers to update (must include ID)
   */
  update?: Array<UpdateCustomerRequest & { id: number }>

  /**
   * Customer IDs to delete
   */
  delete?: number[]
}

/**
 * Batch customer operation response
 */
export interface BatchCustomersResponse {
  /**
   * Created customers
   */
  create: WooCommerceCustomer[]

  /**
   * Updated customers
   */
  update: WooCommerceCustomer[]

  /**
   * Deleted customers
   */
  delete: WooCommerceCustomer[]
}

/**
 * Customer download object
 */
export interface CustomerDownload {
  /**
   * Download ID (read-only)
   */
  download_id: string

  /**
   * Downloadable file ID (read-only)
   */
  download_url: string

  /**
   * Product ID (read-only)
   */
  product_id: number

  /**
   * Product name (read-only)
   */
  product_name: string

  /**
   * Downloadable file name (read-only)
   */
  download_name: string

  /**
   * Order ID (read-only)
   */
  order_id: number

  /**
   * Order key (read-only)
   */
  order_key: string

  /**
   * Number of downloads remaining ('unlimited' or number, read-only)
   */
  downloads_remaining: string

  /**
   * Access expiry date (GMT, read-only)
   */
  access_expires: string | null

  /**
   * Access expiry date (site timezone, read-only)
   */
  access_expires_gmt: string | null

  /**
   * File details (read-only)
   */
  file: {
    name: string
    file: string
  }

  /**
   * HATEOAS links (read-only)
   */
  _links?: Links
}
