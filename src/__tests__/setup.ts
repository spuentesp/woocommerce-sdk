/**
 * Test setup and utilities for WooCommerce SDK
 */

import type { WooCommerceConfig } from '../types/common'

/**
 * Mock WooCommerce configuration for testing
 */
export const mockConfig: WooCommerceConfig = {
  url: 'https://example.com',
  consumerKey: 'ck_test_consumer_key',
  consumerSecret: 'cs_test_consumer_secret',
  version: 'wc/v3',
  timeout: 30000,
  queryStringAuth: true,
}

/**
 * Creates a mock fetch response
 *
 * @param data - Response data
 * @param status - HTTP status code
 * @param headers - Response headers
 * @returns Mock Response object
 */
export function mockFetchResponse<T>(
  data: T,
  status: number = 200,
  headers: Record<string, string> = {}
): Response {
  const defaultHeaders = {
    'content-type': 'application/json',
    'x-wp-total': '100',
    'x-wp-totalpages': '10',
    ...headers,
  }

  return {
    ok: status >= 200 && status < 300,
    status,
    statusText: getStatusText(status),
    headers: new Headers(defaultHeaders),
    json: async () => data,
    text: async () => JSON.stringify(data),
    clone: function () {
      return this
    },
  } as Response
}

/**
 * Creates a mock fetch error response
 *
 * @param status - HTTP status code
 * @param message - Error message
 * @param code - Error code
 * @returns Mock Response object
 */
export function mockFetchError(status: number, message: string, code: string = 'error'): Response {
  const errorData = {
    code,
    message,
    data: {
      status,
    },
  }

  return {
    ok: false,
    status,
    statusText: getStatusText(status),
    headers: new Headers({ 'content-type': 'application/json' }),
    json: async () => errorData,
    text: async () => JSON.stringify(errorData),
    clone: function () {
      return this
    },
  } as Response
}

/**
 * Gets HTTP status text for a status code
 */
function getStatusText(status: number): string {
  const statusTexts: Record<number, string> = {
    200: 'OK',
    201: 'Created',
    204: 'No Content',
    400: 'Bad Request',
    401: 'Unauthorized',
    403: 'Forbidden',
    404: 'Not Found',
    422: 'Unprocessable Entity',
    429: 'Too Many Requests',
    500: 'Internal Server Error',
    502: 'Bad Gateway',
    503: 'Service Unavailable',
  }

  return statusTexts[status] || 'Unknown'
}

/**
 * Mocks global fetch with a specific response
 *
 * @param response - Response to return
 */
export function mockFetch(response: Response): void {
  global.fetch = async () => response
}

/**
 * Mocks global fetch with a custom implementation
 *
 * @param implementation - Fetch implementation
 */
export function mockFetchWith(implementation: typeof global.fetch): void {
  global.fetch = implementation
}

/**
 * Restores original fetch implementation
 */
export function restoreFetch(): void {
  // In Bun, fetch is built-in and doesn't need restoration
  // This is a no-op but kept for API compatibility
}

/**
 * Mock product data
 */
export const mockProduct = {
  id: 123,
  name: 'Test Product',
  slug: 'test-product',
  permalink: 'https://example.com/product/test-product',
  date_created: '2024-01-01T00:00:00',
  date_created_gmt: '2024-01-01T00:00:00',
  date_modified: '2024-01-01T00:00:00',
  date_modified_gmt: '2024-01-01T00:00:00',
  type: 'simple' as const,
  status: 'publish' as const,
  featured: false,
  catalog_visibility: 'visible' as const,
  description: 'Test product description',
  short_description: 'Short description',
  sku: 'TEST-SKU-123',
  price: '99.99',
  regular_price: '99.99',
  sale_price: '',
  date_on_sale_from: null,
  date_on_sale_from_gmt: null,
  date_on_sale_to: null,
  date_on_sale_to_gmt: null,
  price_html: '<span class="amount">$99.99</span>',
  on_sale: false,
  purchasable: true,
  total_sales: 10,
  virtual: false,
  downloadable: false,
  downloads: [],
  download_limit: -1,
  download_expiry: -1,
  external_url: '',
  button_text: '',
  tax_status: 'taxable' as const,
  tax_class: '',
  manage_stock: false,
  stock_quantity: null,
  backorders: 'no' as const,
  backorders_allowed: false,
  backordered: false,
  low_stock_amount: null,
  sold_individually: false,
  weight: '1.5',
  dimensions: {
    length: '10',
    width: '5',
    height: '2',
  },
  shipping_required: true,
  shipping_taxable: true,
  shipping_class: '',
  shipping_class_id: 0,
  reviews_allowed: true,
  average_rating: '4.5',
  rating_count: 5,
  related_ids: [],
  upsell_ids: [],
  cross_sell_ids: [],
  parent_id: 0,
  purchase_note: '',
  categories: [],
  tags: [],
  images: [],
  attributes: [],
  default_attributes: [],
  variations: [],
  grouped_products: [],
  menu_order: 0,
  stock_status: 'instock' as const,
  meta_data: [],
}

/**
 * Mock order data
 */
export const mockOrder = {
  id: 456,
  parent_id: 0,
  status: 'processing' as const,
  currency: 'USD',
  version: '1.0',
  prices_include_tax: false,
  date_created: '2024-01-01T00:00:00',
  date_created_gmt: '2024-01-01T00:00:00',
  date_modified: '2024-01-01T00:00:00',
  date_modified_gmt: '2024-01-01T00:00:00',
  discount_total: '0',
  discount_tax: '0',
  shipping_total: '10.00',
  shipping_tax: '0',
  cart_tax: '0',
  total: '109.99',
  total_tax: '0',
  created_via: 'rest-api',
  customer_note: '',
  date_paid: null,
  date_paid_gmt: null,
  date_completed: null,
  date_completed_gmt: null,
  order_key: 'wc_order_test123',
  billing: {
    first_name: 'John',
    last_name: 'Doe',
    company: '',
    address_1: '123 Main St',
    address_2: '',
    city: 'New York',
    state: 'NY',
    postcode: '10001',
    country: 'US',
    email: 'john@example.com',
    phone: '555-1234',
  },
  shipping: {
    first_name: 'John',
    last_name: 'Doe',
    company: '',
    address_1: '123 Main St',
    address_2: '',
    city: 'New York',
    state: 'NY',
    postcode: '10001',
    country: 'US',
  },
  payment_method: 'stripe',
  payment_method_title: 'Credit Card',
  transaction_id: '',
  customer_ip_address: '192.168.1.1',
  customer_user_agent: 'Test Agent',
  customer_id: 789,
  line_items: [],
  tax_lines: [],
  shipping_lines: [],
  fee_lines: [],
  coupon_lines: [],
  refunds: [],
  is_editable: false,
  needs_payment: false,
  needs_processing: true,
  number: '456',
  meta_data: [],
}

/**
 * Mock customer data
 */
export const mockCustomer = {
  id: 789,
  date_created: '2024-01-01T00:00:00',
  date_created_gmt: '2024-01-01T00:00:00',
  date_modified: '2024-01-01T00:00:00',
  date_modified_gmt: '2024-01-01T00:00:00',
  email: 'customer@example.com',
  first_name: 'Jane',
  last_name: 'Smith',
  role: 'customer',
  username: 'janesmith',
  billing: {
    first_name: 'Jane',
    last_name: 'Smith',
    company: '',
    address_1: '456 Oak Ave',
    address_2: '',
    city: 'Los Angeles',
    state: 'CA',
    postcode: '90001',
    country: 'US',
    email: 'customer@example.com',
    phone: '555-5678',
  },
  shipping: {
    first_name: 'Jane',
    last_name: 'Smith',
    company: '',
    address_1: '456 Oak Ave',
    address_2: '',
    city: 'Los Angeles',
    state: 'CA',
    postcode: '90001',
    country: 'US',
  },
  is_paying_customer: true,
  avatar_url: 'https://example.com/avatar.jpg',
  meta_data: [],
}
