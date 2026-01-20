/**
 * Order types and interfaces for WooCommerce REST API
 */

import type { Address, MetaData, Links, ListParams } from './common'

/**
 * Order status enumeration
 */
export type OrderStatus =
  | 'pending'
  | 'processing'
  | 'on-hold'
  | 'completed'
  | 'cancelled'
  | 'refunded'
  | 'failed'
  | 'trash'

/**
 * Order line item
 */
export interface OrderLineItem {
  /**
   * Item ID (read-only)
   */
  id: number

  /**
   * Product name
   */
  name: string

  /**
   * Product ID
   */
  product_id: number

  /**
   * Variation ID (0 for non-variable products)
   */
  variation_id: number

  /**
   * Quantity ordered
   */
  quantity: number

  /**
   * Tax class of product
   */
  tax_class: string

  /**
   * Line subtotal (before discounts)
   */
  subtotal: string

  /**
   * Line subtotal tax (before discounts, read-only)
   */
  subtotal_tax: string

  /**
   * Line total (after discounts)
   */
  total: string

  /**
   * Line total tax (after discounts, read-only)
   */
  total_tax: string

  /**
   * Line taxes (read-only)
   */
  taxes: Array<{
    id: number
    total: string
    subtotal: string
  }>

  /**
   * Meta data
   */
  meta_data: MetaData[]

  /**
   * Product SKU (read-only)
   */
  sku: string

  /**
   * Product price (read-only)
   */
  price: number

  /**
   * Product image object (read-only)
   */
  image?: {
    id: string
    src: string
  }

  /**
   * Parent item name if this is a child item (read-only)
   */
  parent_name?: string
}

/**
 * Order tax line
 */
export interface OrderTaxLine {
  /**
   * Item ID (read-only)
   */
  id: number

  /**
   * Tax rate code (read-only)
   */
  rate_code: string

  /**
   * Tax rate ID (read-only)
   */
  rate_id: number

  /**
   * Tax rate label (read-only)
   */
  label: string

  /**
   * Tax total compound status (read-only)
   */
  compound: boolean

  /**
   * Tax total amount
   */
  tax_total: string

  /**
   * Shipping tax total amount
   */
  shipping_tax_total: string

  /**
   * Rate percent (read-only)
   */
  rate_percent: number

  /**
   * Meta data
   */
  meta_data: MetaData[]
}

/**
 * Order shipping line
 */
export interface OrderShippingLine {
  /**
   * Item ID (read-only)
   */
  id: number

  /**
   * Shipping method name
   */
  method_title: string

  /**
   * Shipping method ID
   */
  method_id: string

  /**
   * Shipping instance ID
   */
  instance_id: string

  /**
   * Line total (after discounts)
   */
  total: string

  /**
   * Line total tax (after discounts, read-only)
   */
  total_tax: string

  /**
   * Line taxes (read-only)
   */
  taxes: Array<{
    id: number
    total: string
  }>

  /**
   * Meta data
   */
  meta_data: MetaData[]
}

/**
 * Order fee line
 */
export interface OrderFeeLine {
  /**
   * Item ID (read-only)
   */
  id: number

  /**
   * Fee name
   */
  name: string

  /**
   * Tax class
   */
  tax_class: string

  /**
   * Tax status (taxable or none)
   */
  tax_status: 'taxable' | 'none'

  /**
   * Fee total
   */
  total: string

  /**
   * Line total tax (read-only)
   */
  total_tax: string

  /**
   * Line taxes (read-only)
   */
  taxes: Array<{
    id: number
    total: string
    subtotal: string
  }>

  /**
   * Meta data
   */
  meta_data: MetaData[]
}

/**
 * Order coupon line
 */
export interface OrderCouponLine {
  /**
   * Item ID (read-only)
   */
  id: number

  /**
   * Coupon code
   */
  code: string

  /**
   * Discount total amount
   */
  discount: string

  /**
   * Discount tax total amount (read-only)
   */
  discount_tax: string

  /**
   * Meta data
   */
  meta_data: MetaData[]
}

/**
 * Order refund reference
 */
export interface OrderRefundRef {
  /**
   * Refund ID (read-only)
   */
  id: number

  /**
   * Refund reason (read-only)
   */
  reason: string

  /**
   * Refund total amount (read-only)
   */
  total: string
}

/**
 * Complete WooCommerce Order entity
 */
export interface WooCommerceOrder {
  /**
   * Unique order ID (read-only)
   */
  id: number

  /**
   * Parent order ID
   */
  parent_id: number

  /**
   * Order status
   */
  status: OrderStatus

  /**
   * Currency the order was created with (ISO format)
   */
  currency: string

  /**
   * Order version (read-only)
   */
  version: string

  /**
   * Shows if prices include tax (read-only)
   */
  prices_include_tax: boolean

  /**
   * Date order was created (GMT, read-only)
   */
  date_created: string

  /**
   * Date order was created (site timezone, read-only)
   */
  date_created_gmt: string

  /**
   * Date order was last modified (GMT, read-only)
   */
  date_modified: string

  /**
   * Date order was last modified (site timezone, read-only)
   */
  date_modified_gmt: string

  /**
   * Total discount amount
   */
  discount_total: string

  /**
   * Total discount tax amount (read-only)
   */
  discount_tax: string

  /**
   * Total shipping amount
   */
  shipping_total: string

  /**
   * Total shipping tax amount (read-only)
   */
  shipping_tax: string

  /**
   * Sum of line item taxes (read-only)
   */
  cart_tax: string

  /**
   * Grand total amount
   */
  total: string

  /**
   * Total tax amount (read-only)
   */
  total_tax: string

  /**
   * True if the order has been created by customer (read-only)
   */
  created_via: string

  /**
   * Customer's order notes
   */
  customer_note: string

  /**
   * Date order was paid (GMT, read-only)
   */
  date_paid: string | null

  /**
   * Date order was paid (site timezone, read-only)
   */
  date_paid_gmt: string | null

  /**
   * Date order was completed (GMT, read-only)
   */
  date_completed: string | null

  /**
   * Date order was completed (site timezone, read-only)
   */
  date_completed_gmt: string | null

  /**
   * Order hash (read-only)
   */
  order_key: string

  /**
   * Billing address
   */
  billing: Address

  /**
   * Shipping address
   */
  shipping: Address

  /**
   * Payment method ID
   */
  payment_method: string

  /**
   * Payment method title
   */
  payment_method_title: string

  /**
   * Transaction ID
   */
  transaction_id: string

  /**
   * Customer IP address (read-only)
   */
  customer_ip_address: string

  /**
   * Customer user agent (read-only)
   */
  customer_user_agent: string

  /**
   * User ID who owns the order (0 for guests)
   */
  customer_id: number

  /**
   * Line items data
   */
  line_items: OrderLineItem[]

  /**
   * Tax lines data (read-only)
   */
  tax_lines: OrderTaxLine[]

  /**
   * Shipping lines data
   */
  shipping_lines: OrderShippingLine[]

  /**
   * Fee lines data
   */
  fee_lines: OrderFeeLine[]

  /**
   * Coupon lines data (read-only)
   */
  coupon_lines: OrderCouponLine[]

  /**
   * List of refunds (read-only)
   */
  refunds: OrderRefundRef[]

  /**
   * Define if order can be edited by user (read-only)
   */
  is_editable: boolean

  /**
   * Define if order needs payment (read-only)
   */
  needs_payment: boolean

  /**
   * Define if order needs processing (read-only)
   */
  needs_processing: boolean

  /**
   * Order number (read-only)
   */
  number: string

  /**
   * Meta data
   */
  meta_data: MetaData[]

  /**
   * Set to true when order is placed (write-only)
   */
  set_paid?: boolean

  /**
   * HATEOAS links (read-only)
   */
  _links?: Links
}

/**
 * Order creation request
 */
export interface CreateOrderRequest {
  /**
   * Parent order ID
   */
  parent_id?: number

  /**
   * Order status (default: 'pending')
   */
  status?: OrderStatus

  /**
   * Currency (default: shop base currency)
   */
  currency?: string

  /**
   * Customer ID (0 for guest)
   */
  customer_id?: number

  /**
   * Customer's order notes
   */
  customer_note?: string

  /**
   * Billing address
   */
  billing?: Address

  /**
   * Shipping address
   */
  shipping?: Address

  /**
   * Payment method ID
   */
  payment_method?: string

  /**
   * Payment method title
   */
  payment_method_title?: string

  /**
   * Transaction ID
   */
  transaction_id?: string

  /**
   * Line items
   */
  line_items?: Array<{
    product_id: number
    variation_id?: number
    quantity: number
    subtotal?: string
    total?: string
    meta_data?: Array<{ key: string; value: string }>
  }>

  /**
   * Shipping lines
   */
  shipping_lines?: Array<{
    method_id: string
    method_title: string
    total: string
    meta_data?: Array<{ key: string; value: string }>
  }>

  /**
   * Fee lines
   */
  fee_lines?: Array<{
    name: string
    tax_class?: string
    tax_status?: 'taxable' | 'none'
    total: string
    meta_data?: Array<{ key: string; value: string }>
  }>

  /**
   * Coupon codes
   */
  coupon_lines?: Array<{
    code: string
  }>

  /**
   * Set to true when order is placed
   */
  set_paid?: boolean

  /**
   * Meta data
   */
  meta_data?: Array<{ key: string; value: string | number | boolean }>
}

/**
 * Order update request (all fields optional)
 */
export type UpdateOrderRequest = Partial<CreateOrderRequest>

/**
 * Order list query parameters
 */
export interface ListOrdersParams extends ListParams {
  /**
   * Limit result set to orders assigned a specific status
   */
  status?: OrderStatus | OrderStatus[]

  /**
   * Limit result set to orders assigned a specific customer
   */
  customer?: number

  /**
   * Limit result set to orders assigned a specific product
   */
  product?: number

  /**
   * Number of decimal points to use in each resource (default: 2)
   */
  dp?: number

  /**
   * Limit result set to orders created after a given ISO8601 date
   */
  after?: string

  /**
   * Limit result set to orders created before a given ISO8601 date
   */
  before?: string

  /**
   * Limit result set to orders modified after a given ISO8601 date
   */
  modified_after?: string

  /**
   * Limit result set to orders modified before a given ISO8601 date
   */
  modified_before?: string

  /**
   * Limit result set to orders with a specific date paid (GMT)
   */
  dates_are_gmt?: boolean

  /**
   * Sort by attribute
   * Options: 'date', 'id', 'include', 'title', 'slug'
   */
  orderby?: 'date' | 'id' | 'include' | 'title' | 'slug'
}

/**
 * Order note object
 */
export interface OrderNote {
  /**
   * Unique note ID (read-only)
   */
  id: number

  /**
   * Order note author (read-only)
   */
  author: string

  /**
   * Date note was created (GMT, read-only)
   */
  date_created: string

  /**
   * Date note was created (site timezone, read-only)
   */
  date_created_gmt: string

  /**
   * Order note content
   */
  note: string

  /**
   * Whether note is visible to customer
   */
  customer_note: boolean

  /**
   * Shows if note was added by a WooCommerce staff user (read-only)
   */
  added_by_user: boolean

  /**
   * HATEOAS links (read-only)
   */
  _links?: Links
}

/**
 * Create order note request
 */
export interface CreateOrderNoteRequest {
  /**
   * Order note content (required)
   */
  note: string

  /**
   * Whether note is visible to customer (default: false)
   */
  customer_note?: boolean

  /**
   * Shows if note was added by a WooCommerce staff user
   */
  added_by_user?: boolean
}

/**
 * Batch order operation
 */
export interface BatchOrdersRequest {
  /**
   * Orders to create
   */
  create?: CreateOrderRequest[]

  /**
   * Orders to update (must include ID)
   */
  update?: Array<UpdateOrderRequest & { id: number }>

  /**
   * Order IDs to delete
   */
  delete?: number[]
}

/**
 * Batch order operation response
 */
export interface BatchOrdersResponse {
  /**
   * Created orders
   */
  create: WooCommerceOrder[]

  /**
   * Updated orders
   */
  update: WooCommerceOrder[]

  /**
   * Deleted orders
   */
  delete: WooCommerceOrder[]
}
