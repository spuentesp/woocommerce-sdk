/**
 * Coupon types and interfaces for WooCommerce REST API
 */

import type { MetaData, Links, ListParams } from './common'

/**
 * Coupon discount type enumeration
 */
export type DiscountType = 'percent' | 'fixed_cart' | 'fixed_product'

/**
 * Complete WooCommerce Coupon entity
 */
export interface WooCommerceCoupon {
  /**
   * Unique coupon ID (read-only)
   */
  id: number

  /**
   * Coupon code
   */
  code: string

  /**
   * Coupon amount
   */
  amount: string

  /**
   * Date coupon was created (GMT, read-only)
   */
  date_created: string

  /**
   * Date coupon was created (site timezone, read-only)
   */
  date_created_gmt: string

  /**
   * Date coupon was last modified (GMT, read-only)
   */
  date_modified: string

  /**
   * Date coupon was last modified (site timezone, read-only)
   */
  date_modified_gmt: string

  /**
   * Coupon discount type
   */
  discount_type: DiscountType

  /**
   * Coupon description
   */
  description: string

  /**
   * UTC DateTime when coupon expires
   */
  date_expires: string | null

  /**
   * UTC DateTime when coupon expires (GMT)
   */
  date_expires_gmt: string | null

  /**
   * Number of times coupon has been used (read-only)
   */
  usage_count: number

  /**
   * Whether coupon can only be used individually
   */
  individual_use: boolean

  /**
   * List of product IDs the coupon can be used on
   */
  product_ids: number[]

  /**
   * List of product IDs the coupon cannot be used on
   */
  excluded_product_ids: number[]

  /**
   * How many times the coupon can be used in total
   */
  usage_limit: number | null

  /**
   * How many times the coupon can be used per customer
   */
  usage_limit_per_user: number | null

  /**
   * Max number of items in cart the coupon can be applied to
   */
  limit_usage_to_x_items: number | null

  /**
   * Whether coupon can only be used by free shipping is available
   */
  free_shipping: boolean

  /**
   * List of category IDs the coupon applies to
   */
  product_categories: number[]

  /**
   * List of category IDs the coupon does not apply to
   */
  excluded_product_categories: number[]

  /**
   * Whether sale items can be discounted by this coupon
   */
  exclude_sale_items: boolean

  /**
   * Minimum order amount required to use coupon
   */
  minimum_amount: string

  /**
   * Maximum order amount allowed when using coupon
   */
  maximum_amount: string

  /**
   * List of email addresses that can use this coupon
   */
  email_restrictions: string[]

  /**
   * List of user IDs who have used the coupon (read-only)
   */
  used_by: string[]

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
 * Coupon creation request
 */
export interface CreateCouponRequest {
  /**
   * Coupon code (required)
   */
  code: string

  /**
   * Coupon amount (default: 0)
   */
  amount?: string

  /**
   * Coupon discount type (default: 'fixed_cart')
   */
  discount_type?: DiscountType

  /**
   * Coupon description
   */
  description?: string

  /**
   * DateTime when coupon expires
   */
  date_expires?: string

  /**
   * DateTime when coupon expires (GMT)
   */
  date_expires_gmt?: string

  /**
   * Whether coupon can only be used individually
   */
  individual_use?: boolean

  /**
   * List of product IDs the coupon can be used on
   */
  product_ids?: number[]

  /**
   * List of product IDs the coupon cannot be used on
   */
  excluded_product_ids?: number[]

  /**
   * How many times the coupon can be used in total
   */
  usage_limit?: number

  /**
   * How many times the coupon can be used per customer
   */
  usage_limit_per_user?: number

  /**
   * Max number of items in cart the coupon can be applied to
   */
  limit_usage_to_x_items?: number

  /**
   * Whether coupon enables free shipping
   */
  free_shipping?: boolean

  /**
   * List of category IDs the coupon applies to
   */
  product_categories?: number[]

  /**
   * List of category IDs the coupon does not apply to
   */
  excluded_product_categories?: number[]

  /**
   * Whether sale items can be discounted
   */
  exclude_sale_items?: boolean

  /**
   * Minimum order amount
   */
  minimum_amount?: string

  /**
   * Maximum order amount
   */
  maximum_amount?: string

  /**
   * List of email addresses that can use this coupon
   */
  email_restrictions?: string[]

  /**
   * Meta data
   */
  meta_data?: Array<{ key: string; value: string | number | boolean }>
}

/**
 * Coupon update request (all fields optional)
 */
export type UpdateCouponRequest = Partial<CreateCouponRequest>

/**
 * Coupon list query parameters
 */
export interface ListCouponsParams extends ListParams {
  /**
   * Limit result set to resources with a specific code
   */
  code?: string

  /**
   * Limit result set to coupons created after a given ISO8601 date
   */
  after?: string

  /**
   * Limit result set to coupons created before a given ISO8601 date
   */
  before?: string

  /**
   * Limit result set to coupons modified after a given ISO8601 date
   */
  modified_after?: string

  /**
   * Limit result set to coupons modified before a given ISO8601 date
   */
  modified_before?: string

  /**
   * Ensure result set excludes coupons with specific codes
   */
  exclude?: number[]

  /**
   * Limit result set to coupons with specific codes
   */
  include?: number[]

  /**
   * Sort by attribute
   * Options: 'date', 'id', 'include', 'title', 'slug'
   */
  orderby?: 'date' | 'id' | 'include' | 'title' | 'slug'
}

/**
 * Batch coupon operation
 */
export interface BatchCouponsRequest {
  /**
   * Coupons to create
   */
  create?: CreateCouponRequest[]

  /**
   * Coupons to update (must include ID)
   */
  update?: Array<UpdateCouponRequest & { id: number }>

  /**
   * Coupon IDs to delete
   */
  delete?: number[]
}

/**
 * Batch coupon operation response
 */
export interface BatchCouponsResponse {
  /**
   * Created coupons
   */
  create: WooCommerceCoupon[]

  /**
   * Updated coupons
   */
  update: WooCommerceCoupon[]

  /**
   * Deleted coupons
   */
  delete: WooCommerceCoupon[]
}
