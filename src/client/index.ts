/**
 * Main WooCommerce SDK Client
 *
 * Provides access to all WooCommerce REST API v3 resources
 */

import type { WooCommerceConfig } from '../types/common'
import { ProductsClient } from './products-client'
import { OrdersClient } from './orders-client'
import { CustomersClient } from './customers-client'
import { CouponsClient } from './coupons-client'
import { WebhooksClient } from './webhooks-client'
import { VariationsClient } from './variations-client'
import { CategoriesClient } from './categories-client'
import { TagsClient } from './tags-client'
import { RefundsClient } from './refunds-client'

/**
 * Main WooCommerce REST API Client
 *
 * @example
 * ```typescript
 * const woocommerce = new WooCommerceClient({
 *   url: 'https://example.com',
 *   consumerKey: 'ck_...',
 *   consumerSecret: 'cs_...',
 *   version: 'wc/v3',
 * })
 *
 * // Fetch products
 * const products = await woocommerce.products.list({ per_page: 50 })
 *
 * // Create order
 * const order = await woocommerce.orders.create({
 *   line_items: [{ product_id: 123, quantity: 1 }],
 * })
 * ```
 */
export class WooCommerceClient {
  /**
   * Products API client
   */
  public readonly products: ProductsClient

  /**
   * Product variations API client
   */
  public readonly variations: VariationsClient

  /**
   * Product categories API client
   */
  public readonly categories: CategoriesClient

  /**
   * Product tags API client
   */
  public readonly tags: TagsClient

  /**
   * Orders API client
   */
  public readonly orders: OrdersClient

  /**
   * Order refunds API client
   */
  public readonly refunds: RefundsClient

  /**
   * Customers API client
   */
  public readonly customers: CustomersClient

  /**
   * Coupons API client
   */
  public readonly coupons: CouponsClient

  /**
   * Webhooks API client
   */
  public readonly webhooks: WebhooksClient

  /**
   * Creates a new WooCommerce client instance
   *
   * @param config - Configuration options
   */
  constructor(config: WooCommerceConfig) {
    // Initialize all resource clients
    this.products = new ProductsClient(config)
    this.variations = new VariationsClient(config)
    this.categories = new CategoriesClient(config)
    this.tags = new TagsClient(config)
    this.orders = new OrdersClient(config)
    this.refunds = new RefundsClient(config)
    this.customers = new CustomersClient(config)
    this.coupons = new CouponsClient(config)
    this.webhooks = new WebhooksClient(config)
  }
}

// Export all client classes for advanced usage
export { ProductsClient } from './products-client'
export { OrdersClient } from './orders-client'
export { CustomersClient } from './customers-client'
export { CouponsClient } from './coupons-client'
export { WebhooksClient } from './webhooks-client'
export { VariationsClient } from './variations-client'
export { CategoriesClient } from './categories-client'
export { TagsClient } from './tags-client'
export { RefundsClient } from './refunds-client'
export { BaseClient } from './base-client'
