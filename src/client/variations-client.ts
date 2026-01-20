/**
 * Product Variations API client for WooCommerce REST API
 */

import { BaseClient } from './base-client'
import type {
  WooCommerceVariation,
  CreateVariationRequest,
  UpdateVariationRequest,
  ListVariationsParams,
  BatchVariationsRequest,
  BatchVariationsResponse,
} from '../types/variations'

/**
 * Client for managing product variations
 */
export class VariationsClient extends BaseClient {
  /**
   * Lists all variations for a product
   *
   * @param productId - Parent product ID
   * @param params - Query parameters for filtering and pagination
   * @returns Array of variations
   */
  async list(productId: number, params?: ListVariationsParams): Promise<WooCommerceVariation[]> {
    return super.get<WooCommerceVariation[]>(`products/${productId}/variations`, params)
  }

  /**
   * Retrieves a single variation
   *
   * @param productId - Parent product ID
   * @param variationId - Variation ID
   * @returns Variation object
   */
  async getVariation(productId: number, variationId: number): Promise<WooCommerceVariation> {
    return super.get<WooCommerceVariation>(`products/${productId}/variations/${variationId}`)
  }

  /**
   * Creates a new variation
   *
   * @param productId - Parent product ID
   * @param variation - Variation data
   * @returns Created variation
   */
  async create(
    productId: number,
    variation: CreateVariationRequest
  ): Promise<WooCommerceVariation> {
    return super.post<WooCommerceVariation>(`products/${productId}/variations`, variation)
  }

  /**
   * Updates an existing variation
   *
   * @param productId - Parent product ID
   * @param variationId - Variation ID
   * @param updates - Variation updates
   * @returns Updated variation
   */
  async update(
    productId: number,
    variationId: number,
    updates: UpdateVariationRequest
  ): Promise<WooCommerceVariation> {
    return super.put<WooCommerceVariation>(
      `products/${productId}/variations/${variationId}`,
      updates
    )
  }

  /**
   * Deletes a variation
   *
   * @param productId - Parent product ID
   * @param variationId - Variation ID
   * @param force - Whether to permanently delete
   * @returns Deleted variation
   */
  async deleteVariation(
    productId: number,
    variationId: number,
    force: boolean = false
  ): Promise<WooCommerceVariation> {
    return super.delete<WooCommerceVariation>(`products/${productId}/variations/${variationId}`, {
      force,
    })
  }

  /**
   * Performs batch operations on variations
   *
   * @param productId - Parent product ID
   * @param batch - Batch operation data
   * @returns Batch operation results
   */
  async batch(productId: number, batch: BatchVariationsRequest): Promise<BatchVariationsResponse> {
    return super.post<BatchVariationsResponse>(`products/${productId}/variations/batch`, batch)
  }
}
