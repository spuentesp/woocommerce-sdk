/**
 * Product Categories API client for WooCommerce REST API
 */

import { BaseClient } from './base-client'
import type {
  WooCommerceCategory,
  CreateCategoryRequest,
  UpdateCategoryRequest,
  ListCategoriesParams,
  BatchCategoriesRequest,
  BatchCategoriesResponse,
} from '../types/categories'

/**
 * Client for managing product categories
 */
export class CategoriesClient extends BaseClient {
  /**
   * Lists all product categories
   *
   * @param params - Query parameters for filtering and pagination
   * @returns Array of categories
   */
  async list(params?: ListCategoriesParams): Promise<WooCommerceCategory[]> {
    return super.get<WooCommerceCategory[]>('products/categories', params)
  }

  /**
   * Retrieves a single category by ID
   *
   * @param categoryId - Category ID
   * @returns Category object
   */
  async getCategory(categoryId: number): Promise<WooCommerceCategory> {
    return super.get<WooCommerceCategory>(`products/categories/${categoryId}`)
  }

  /**
   * Creates a new category
   *
   * @param category - Category data
   * @returns Created category
   */
  async create(category: CreateCategoryRequest): Promise<WooCommerceCategory> {
    return super.post<WooCommerceCategory>('products/categories', category)
  }

  /**
   * Updates an existing category
   *
   * @param categoryId - Category ID
   * @param updates - Category updates
   * @returns Updated category
   */
  async update(categoryId: number, updates: UpdateCategoryRequest): Promise<WooCommerceCategory> {
    return super.put<WooCommerceCategory>(`products/categories/${categoryId}`, updates)
  }

  /**
   * Deletes a category
   *
   * @param categoryId - Category ID
   * @param force - Whether to permanently delete
   * @returns Deleted category
   */
  async deleteCategory(categoryId: number, force: boolean = false): Promise<WooCommerceCategory> {
    return super.delete<WooCommerceCategory>(`products/categories/${categoryId}`, { force })
  }

  /**
   * Performs batch operations on categories
   *
   * @param batch - Batch operation data
   * @returns Batch operation results
   */
  async batch(batch: BatchCategoriesRequest): Promise<BatchCategoriesResponse> {
    return super.post<BatchCategoriesResponse>('products/categories/batch', batch)
  }
}
