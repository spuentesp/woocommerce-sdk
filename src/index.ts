/**
 * @stockflow/woocommerce-sdk
 *
 * Complete TypeScript SDK for WooCommerce REST API v3
 *
 * @example
 * ```typescript
 * import { WooCommerceClient } from '@stockflow/woocommerce-sdk'
 *
 * const woocommerce = new WooCommerceClient({
 *   url: 'https://your-store.com',
 *   consumerKey: 'ck_your_consumer_key',
 *   consumerSecret: 'cs_your_consumer_secret',
 *   version: 'wc/v3',
 * })
 *
 * // Fetch products
 * const products = await woocommerce.products.list({ per_page: 50 })
 *
 * // Get orders
 * const orders = await woocommerce.orders.list({ status: 'processing' })
 *
 * // Create customer
 * const customer = await woocommerce.customers.create({
 *   email: 'customer@example.com',
 *   first_name: 'John',
 *   last_name: 'Doe',
 * })
 * ```
 */

// Main client
export { WooCommerceClient } from './client'

// Individual clients (for advanced usage)
export {
  BaseClient,
  ProductsClient,
  OrdersClient,
  CustomersClient,
  CouponsClient,
  WebhooksClient,
  VariationsClient,
  CategoriesClient,
  TagsClient,
  RefundsClient,
} from './client'

// Type definitions
export * from './types'

// Error classes
export {
  WooCommerceError,
  WooCommerceAuthenticationError,
  WooCommerceAuthorizationError,
  WooCommerceNotFoundError,
  WooCommerceValidationError,
  WooCommerceRateLimitError,
  WooCommerceNetworkError,
  WooCommerceAPIError,
} from './errors'

// Utility functions
export { buildQueryString, sleep, retryWithBackoff, normalizeUrl } from './utils'
