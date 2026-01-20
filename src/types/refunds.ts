/**
 * Order Refund types and interfaces for WooCommerce REST API
 */

import type { MetaData, Links, ListParams } from './common'

/**
 * Refund line item
 */
export interface RefundLineItem {
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
   * Quantity refunded (negative number)
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
}

/**
 * Complete WooCommerce Refund entity
 */
export interface WooCommerceRefund {
  /**
   * Unique refund ID (read-only)
   */
  id: number

  /**
   * Date refund was created (GMT, read-only)
   */
  date_created: string

  /**
   * Date refund was created (site timezone, read-only)
   */
  date_created_gmt: string

  /**
   * Refund amount (read-only)
   */
  amount: string

  /**
   * Reason for refund
   */
  reason: string

  /**
   * User ID of user who created refund (read-only)
   */
  refunded_by: number

  /**
   * If refund was sent via payment gateway API (read-only)
   */
  refunded_payment: boolean

  /**
   * Meta data
   */
  meta_data: MetaData[]

  /**
   * Line items data
   */
  line_items: RefundLineItem[]

  /**
   * HATEOAS links (read-only)
   */
  _links?: Links
}

/**
 * Refund creation request
 */
export interface CreateRefundRequest {
  /**
   * Refund amount
   */
  amount?: string

  /**
   * Reason for refund
   */
  reason?: string

  /**
   * User ID of user who created refund
   */
  refunded_by?: number

  /**
   * Whether to send refund via payment gateway API (default: true)
   */
  api_refund?: boolean

  /**
   * Line items to refund (optional, for partial refunds)
   */
  line_items?: Array<{
    /**
     * Item ID from order
     */
    id: number

    /**
     * Quantity to refund (use negative number)
     */
    quantity?: number

    /**
     * Refund total amount for this line
     */
    refund_total?: number

    /**
     * Refund tax total for this line
     */
    refund_tax?: Array<{
      id: number
      refund_total: number
    }>
  }>

  /**
   * Meta data
   */
  meta_data?: Array<{ key: string; value: string | number | boolean }>
}

/**
 * Refund list query parameters
 */
export interface ListRefundsParams extends ListParams {
  /**
   * Number of decimal points to use in each resource (default: 2)
   */
  dp?: number

  /**
   * Sort by attribute
   * Options: 'date', 'id', 'include', 'title', 'slug'
   */
  orderby?: 'date' | 'id' | 'include' | 'title' | 'slug'
}
