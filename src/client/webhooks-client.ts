/**
 * Webhooks API client for WooCommerce REST API
 */

import { BaseClient } from './base-client'
import type {
  WooCommerceWebhook,
  CreateWebhookRequest,
  UpdateWebhookRequest,
  ListWebhooksParams,
  BatchWebhooksRequest,
  BatchWebhooksResponse,
  WebhookDelivery,
} from '../types/webhooks'

/**
 * Client for managing webhooks
 */
export class WebhooksClient extends BaseClient {
  /**
   * Lists all webhooks
   *
   * @param params - Query parameters for filtering and pagination
   * @returns Array of webhooks
   */
  async list(params?: ListWebhooksParams): Promise<WooCommerceWebhook[]> {
    return super.get<WooCommerceWebhook[]>('webhooks', params)
  }

  /**
   * Retrieves a single webhook by ID
   *
   * @param webhookId - Webhook ID
   * @returns Webhook object
   */
  async getWebhook(webhookId: number): Promise<WooCommerceWebhook> {
    return super.get<WooCommerceWebhook>(`webhooks/${webhookId}`)
  }

  /**
   * Creates a new webhook
   *
   * @param webhook - Webhook data
   * @returns Created webhook
   */
  async create(webhook: CreateWebhookRequest): Promise<WooCommerceWebhook> {
    return super.post<WooCommerceWebhook>('webhooks', webhook)
  }

  /**
   * Updates an existing webhook
   *
   * @param webhookId - Webhook ID
   * @param updates - Webhook updates
   * @returns Updated webhook
   */
  async update(webhookId: number, updates: UpdateWebhookRequest): Promise<WooCommerceWebhook> {
    return super.put<WooCommerceWebhook>(`webhooks/${webhookId}`, updates)
  }

  /**
   * Deletes a webhook
   *
   * @param webhookId - Webhook ID
   * @param force - Whether to permanently delete
   * @returns Deleted webhook
   */
  async deleteWebhook(webhookId: number, force: boolean = true): Promise<WooCommerceWebhook> {
    return super.delete<WooCommerceWebhook>(`webhooks/${webhookId}`, { force })
  }

  /**
   * Performs batch operations on webhooks
   *
   * @param batch - Batch operation data
   * @returns Batch operation results
   */
  async batch(batch: BatchWebhooksRequest): Promise<BatchWebhooksResponse> {
    return super.post<BatchWebhooksResponse>('webhooks/batch', batch)
  }

  /**
   * Lists all deliveries for a webhook
   *
   * @param webhookId - Webhook ID
   * @returns Array of webhook deliveries
   */
  async listDeliveries(webhookId: number): Promise<WebhookDelivery[]> {
    return super.get<WebhookDelivery[]>(`webhooks/${webhookId}/deliveries`)
  }

  /**
   * Retrieves a single webhook delivery
   *
   * @param webhookId - Webhook ID
   * @param deliveryId - Delivery ID
   * @returns Webhook delivery
   */
  async getDelivery(webhookId: number, deliveryId: number): Promise<WebhookDelivery> {
    return super.get<WebhookDelivery>(`webhooks/${webhookId}/deliveries/${deliveryId}`)
  }
}
