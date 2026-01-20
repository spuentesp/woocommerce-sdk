/**
 * Webhook types and interfaces for WooCommerce REST API
 */

import type { Links, ListParams } from './common'

/**
 * Webhook topic enumeration (resource.event format)
 */
export type WebhookTopic =
  | 'coupon.created'
  | 'coupon.updated'
  | 'coupon.deleted'
  | 'coupon.restored'
  | 'customer.created'
  | 'customer.updated'
  | 'customer.deleted'
  | 'order.created'
  | 'order.updated'
  | 'order.deleted'
  | 'order.restored'
  | 'product.created'
  | 'product.updated'
  | 'product.deleted'
  | 'product.restored'
  | 'action'

/**
 * Webhook status enumeration
 */
export type WebhookStatus = 'active' | 'paused' | 'disabled'

/**
 * Complete WooCommerce Webhook entity
 */
export interface WooCommerceWebhook {
  /**
   * Unique webhook ID (read-only)
   */
  id: number

  /**
   * Webhook name
   */
  name: string

  /**
   * Webhook status
   */
  status: WebhookStatus

  /**
   * Webhook topic
   */
  topic: WebhookTopic

  /**
   * Webhook resource (read-only)
   */
  resource: string

  /**
   * Webhook event (read-only)
   */
  event: string

  /**
   * WooCommerce action names (array of strings, for 'action' topic only)
   */
  hooks: string[]

  /**
   * Webhook delivery URL (must be HTTP or HTTPS)
   */
  delivery_url: string

  /**
   * Secret key used to generate hash of delivery payload (write-only)
   */
  secret?: string

  /**
   * Date webhook was created (GMT, read-only)
   */
  date_created: string

  /**
   * Date webhook was created (site timezone, read-only)
   */
  date_created_gmt: string

  /**
   * Date webhook was last modified (GMT, read-only)
   */
  date_modified: string

  /**
   * Date webhook was last modified (site timezone, read-only)
   */
  date_modified_gmt: string

  /**
   * HATEOAS links (read-only)
   */
  _links?: Links
}

/**
 * Webhook creation request
 */
export interface CreateWebhookRequest {
  /**
   * Webhook name (required)
   */
  name: string

  /**
   * Webhook topic (required)
   */
  topic: WebhookTopic

  /**
   * Webhook delivery URL (required, must be HTTP or HTTPS)
   */
  delivery_url: string

  /**
   * Webhook status (default: 'active')
   */
  status?: WebhookStatus

  /**
   * Secret key used to generate hash
   */
  secret?: string

  /**
   * WooCommerce action names (for 'action' topic only)
   */
  hooks?: string[]
}

/**
 * Webhook update request
 */
export interface UpdateWebhookRequest {
  /**
   * Webhook name
   */
  name?: string

  /**
   * Webhook status
   */
  status?: WebhookStatus

  /**
   * Webhook topic
   */
  topic?: WebhookTopic

  /**
   * Webhook delivery URL
   */
  delivery_url?: string

  /**
   * Secret key
   */
  secret?: string

  /**
   * WooCommerce action names
   */
  hooks?: string[]
}

/**
 * Webhook list query parameters
 */
export interface ListWebhooksParams extends ListParams {
  /**
   * Limit result set to webhooks assigned a specific status
   */
  status?: WebhookStatus

  /**
   * Limit result set to webhooks created after a given ISO8601 date
   */
  after?: string

  /**
   * Limit result set to webhooks created before a given ISO8601 date
   */
  before?: string

  /**
   * Sort by attribute
   * Options: 'date', 'id', 'include', 'title', 'slug'
   */
  orderby?: 'date' | 'id' | 'include' | 'title' | 'slug'
}

/**
 * Webhook delivery object
 */
export interface WebhookDelivery {
  /**
   * Unique delivery ID (read-only)
   */
  id: number

  /**
   * Delivery duration in seconds (read-only)
   */
  duration: string

  /**
   * DateTime of delivery (read-only)
   */
  summary: string

  /**
   * Delivery request URL (read-only)
   */
  request_url: string

  /**
   * Delivery request headers (read-only)
   */
  request_headers: Record<string, string>

  /**
   * Delivery request body (read-only)
   */
  request_body: string

  /**
   * Delivery response code (read-only)
   */
  response_code: string

  /**
   * Delivery response message (read-only)
   */
  response_message: string

  /**
   * Delivery response headers (read-only)
   */
  response_headers: Record<string, string>

  /**
   * Delivery response body (read-only)
   */
  response_body: string

  /**
   * Date delivery was logged (GMT, read-only)
   */
  date_created: string

  /**
   * Date delivery was logged (site timezone, read-only)
   */
  date_created_gmt: string

  /**
   * HATEOAS links (read-only)
   */
  _links?: Links
}

/**
 * Webhook payload for coupon events
 */
export interface CouponWebhookPayload {
  /**
   * Webhook ID
   */
  webhook_id: number

  /**
   * Event name
   */
  event: 'created' | 'updated' | 'deleted' | 'restored'

  /**
   * Resource type
   */
  resource: 'coupon'

  /**
   * Coupon data
   */
  data: any // Using any for payload data as it varies
}

/**
 * Webhook payload for customer events
 */
export interface CustomerWebhookPayload {
  /**
   * Webhook ID
   */
  webhook_id: number

  /**
   * Event name
   */
  event: 'created' | 'updated' | 'deleted'

  /**
   * Resource type
   */
  resource: 'customer'

  /**
   * Customer data
   */
  data: any
}

/**
 * Webhook payload for order events
 */
export interface OrderWebhookPayload {
  /**
   * Webhook ID
   */
  webhook_id: number

  /**
   * Event name
   */
  event: 'created' | 'updated' | 'deleted' | 'restored'

  /**
   * Resource type
   */
  resource: 'order'

  /**
   * Order data
   */
  data: any
}

/**
 * Webhook payload for product events
 */
export interface ProductWebhookPayload {
  /**
   * Webhook ID
   */
  webhook_id: number

  /**
   * Event name
   */
  event: 'created' | 'updated' | 'deleted' | 'restored'

  /**
   * Resource type
   */
  resource: 'product'

  /**
   * Product data
   */
  data: any
}

/**
 * Union type for all webhook payloads
 */
export type WebhookPayload =
  | CouponWebhookPayload
  | CustomerWebhookPayload
  | OrderWebhookPayload
  | ProductWebhookPayload

/**
 * Batch webhook operation
 */
export interface BatchWebhooksRequest {
  /**
   * Webhooks to create
   */
  create?: CreateWebhookRequest[]

  /**
   * Webhooks to update (must include ID)
   */
  update?: Array<UpdateWebhookRequest & { id: number }>

  /**
   * Webhook IDs to delete
   */
  delete?: number[]
}

/**
 * Batch webhook operation response
 */
export interface BatchWebhooksResponse {
  /**
   * Created webhooks
   */
  create: WooCommerceWebhook[]

  /**
   * Updated webhooks
   */
  update: WooCommerceWebhook[]

  /**
   * Deleted webhooks
   */
  delete: WooCommerceWebhook[]
}
