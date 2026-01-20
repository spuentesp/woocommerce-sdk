/**
 * Product Tags API client for WooCommerce REST API
 */

import { BaseClient } from './base-client'
import type {
  WooCommerceTag,
  CreateTagRequest,
  UpdateTagRequest,
  ListTagsParams,
  BatchTagsRequest,
  BatchTagsResponse,
} from '../types/tags'

/**
 * Client for managing product tags
 */
export class TagsClient extends BaseClient {
  /**
   * Lists all product tags
   *
   * @param params - Query parameters for filtering and pagination
   * @returns Array of tags
   */
  async list(params?: ListTagsParams): Promise<WooCommerceTag[]> {
    return super.get<WooCommerceTag[]>('products/tags', params)
  }

  /**
   * Retrieves a single tag by ID
   *
   * @param tagId - Tag ID
   * @returns Tag object
   */
  async getTag(tagId: number): Promise<WooCommerceTag> {
    return super.get<WooCommerceTag>(`products/tags/${tagId}`)
  }

  /**
   * Creates a new tag
   *
   * @param tag - Tag data
   * @returns Created tag
   */
  async create(tag: CreateTagRequest): Promise<WooCommerceTag> {
    return super.post<WooCommerceTag>('products/tags', tag)
  }

  /**
   * Updates an existing tag
   *
   * @param tagId - Tag ID
   * @param updates - Tag updates
   * @returns Updated tag
   */
  async update(tagId: number, updates: UpdateTagRequest): Promise<WooCommerceTag> {
    return super.put<WooCommerceTag>(`products/tags/${tagId}`, updates)
  }

  /**
   * Deletes a tag
   *
   * @param tagId - Tag ID
   * @param force - Whether to permanently delete
   * @returns Deleted tag
   */
  async deleteTag(tagId: number, force: boolean = false): Promise<WooCommerceTag> {
    return super.delete<WooCommerceTag>(`products/tags/${tagId}`, { force })
  }

  /**
   * Performs batch operations on tags
   *
   * @param batch - Batch operation data
   * @returns Batch operation results
   */
  async batch(batch: BatchTagsRequest): Promise<BatchTagsResponse> {
    return super.post<BatchTagsResponse>('products/tags/batch', batch)
  }
}
