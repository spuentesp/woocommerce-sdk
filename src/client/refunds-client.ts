/**
 * Order Refunds API client for WooCommerce REST API
 */

import { BaseClient } from './base-client'
import type { WooCommerceRefund, CreateRefundRequest, ListRefundsParams } from '../types/refunds'

/**
 * Client for managing order refunds
 */
export class RefundsClient extends BaseClient {
  /**
   * Lists all refunds for an order
   *
   * @param orderId - Order ID
   * @param params - Query parameters for filtering and pagination
   * @returns Array of refunds
   */
  async list(orderId: number, params?: ListRefundsParams): Promise<WooCommerceRefund[]> {
    return super.get<WooCommerceRefund[]>(`orders/${orderId}/refunds`, params)
  }

  /**
   * Retrieves a single refund
   *
   * @param orderId - Order ID
   * @param refundId - Refund ID
   * @returns Refund object
   */
  async getRefund(orderId: number, refundId: number): Promise<WooCommerceRefund> {
    return super.get<WooCommerceRefund>(`orders/${orderId}/refunds/${refundId}`)
  }

  /**
   * Creates a new refund
   *
   * @param orderId - Order ID
   * @param refund - Refund data
   * @returns Created refund
   */
  async create(orderId: number, refund: CreateRefundRequest): Promise<WooCommerceRefund> {
    return super.post<WooCommerceRefund>(`orders/${orderId}/refunds`, refund)
  }

  /**
   * Deletes a refund
   *
   * @param orderId - Order ID
   * @param refundId - Refund ID
   * @param force - Whether to permanently delete
   * @returns Deleted refund
   */
  async deleteRefund(
    orderId: number,
    refundId: number,
    force: boolean = true
  ): Promise<WooCommerceRefund> {
    return super.delete<WooCommerceRefund>(`orders/${orderId}/refunds/${refundId}`, { force })
  }
}
