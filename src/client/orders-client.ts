/**
 * Orders API client for WooCommerce REST API
 */

import { BaseClient } from './base-client'
import type {
  WooCommerceOrder,
  CreateOrderRequest,
  UpdateOrderRequest,
  ListOrdersParams,
  BatchOrdersRequest,
  BatchOrdersResponse,
  OrderNote,
  CreateOrderNoteRequest,
} from '../types/orders'

/**
 * Client for managing orders
 */
export class OrdersClient extends BaseClient {
  /**
   * Lists all orders
   *
   * @param params - Query parameters for filtering and pagination
   * @returns Array of orders
   */
  async list(params?: ListOrdersParams): Promise<WooCommerceOrder[]> {
    return super.get<WooCommerceOrder[]>('orders', params)
  }

  /**
   * Retrieves a single order by ID
   *
   * @param orderId - Order ID
   * @returns Order object
   */
  async getOrder(orderId: number): Promise<WooCommerceOrder> {
    return super.get<WooCommerceOrder>(`orders/${orderId}`)
  }

  /**
   * Creates a new order
   *
   * @param order - Order data
   * @returns Created order
   */
  async create(order: CreateOrderRequest): Promise<WooCommerceOrder> {
    return super.post<WooCommerceOrder>('orders', order)
  }

  /**
   * Updates an existing order
   *
   * @param orderId - Order ID
   * @param updates - Order updates
   * @returns Updated order
   */
  async update(orderId: number, updates: UpdateOrderRequest): Promise<WooCommerceOrder> {
    return super.put<WooCommerceOrder>(`orders/${orderId}`, updates)
  }

  /**
   * Deletes an order
   *
   * @param orderId - Order ID
   * @param force - Whether to permanently delete (true) or move to trash (false)
   * @returns Deleted order
   */
  async deleteOrder(orderId: number, force: boolean = false): Promise<WooCommerceOrder> {
    return super.delete<WooCommerceOrder>(`orders/${orderId}`, { force })
  }

  /**
   * Performs batch operations on orders
   *
   * @param batch - Batch operation data
   * @returns Batch operation results
   */
  async batch(batch: BatchOrdersRequest): Promise<BatchOrdersResponse> {
    return super.post<BatchOrdersResponse>('orders/batch', batch)
  }

  /**
   * Lists all notes for an order
   *
   * @param orderId - Order ID
   * @returns Array of order notes
   */
  async listNotes(orderId: number): Promise<OrderNote[]> {
    return super.get<OrderNote[]>(`orders/${orderId}/notes`)
  }

  /**
   * Retrieves a single order note
   *
   * @param orderId - Order ID
   * @param noteId - Note ID
   * @returns Order note
   */
  async getNote(orderId: number, noteId: number): Promise<OrderNote> {
    return super.get<OrderNote>(`orders/${orderId}/notes/${noteId}`)
  }

  /**
   * Creates a new order note
   *
   * @param orderId - Order ID
   * @param note - Note data
   * @returns Created note
   */
  async createNote(orderId: number, note: CreateOrderNoteRequest): Promise<OrderNote> {
    return super.post<OrderNote>(`orders/${orderId}/notes`, note)
  }

  /**
   * Deletes an order note
   *
   * @param orderId - Order ID
   * @param noteId - Note ID
   * @param force - Whether to permanently delete
   * @returns Deleted note
   */
  async deleteNote(orderId: number, noteId: number, force: boolean = true): Promise<OrderNote> {
    return super.delete<OrderNote>(`orders/${orderId}/notes/${noteId}`, { force })
  }

  /**
   * Helper: Retrieves all orders with automatic pagination
   *
   * @param status - Order status filter
   * @param perPage - Items per page (default: 100, max: 100)
   * @returns Array of all orders
   */
  async getAll(
    status?:
      | 'pending'
      | 'processing'
      | 'on-hold'
      | 'completed'
      | 'cancelled'
      | 'refunded'
      | 'failed',
    perPage: number = 100
  ): Promise<WooCommerceOrder[]> {
    const allOrders: WooCommerceOrder[] = []
    let page = 1
    let hasMore = true

    while (hasMore) {
      const orders = await this.list({
        status,
        per_page: perPage,
        page,
      })

      allOrders.push(...orders)

      if (orders.length < perPage) {
        hasMore = false
      } else {
        page++
      }
    }

    return allOrders
  }
}
