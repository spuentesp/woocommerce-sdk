/**
 * Products API client for WooCommerce REST API
 */

import { BaseClient } from './base-client'
import type {
  WooCommerceProduct,
  CreateProductRequest,
  UpdateProductRequest,
  ListProductsParams,
  BatchProductsRequest,
  BatchProductsResponse,
} from '../types/products'

/**
 * Client for managing products
 */
export class ProductsClient extends BaseClient {
  /**
   * Lists all products
   *
   * @param params - Query parameters for filtering and pagination
   * @returns Array of products
   */
  async list(params?: ListProductsParams): Promise<WooCommerceProduct[]> {
    return super.get<WooCommerceProduct[]>('products', params)
  }

  /**
   * Retrieves a single product by ID
   *
   * @param productId - Product ID
   * @returns Product object
   */
  async getProduct(productId: number): Promise<WooCommerceProduct> {
    return super.get<WooCommerceProduct>(`products/${productId}`)
  }

  /**
   * Creates a new product
   *
   * @param product - Product data
   * @returns Created product
   */
  async create(product: CreateProductRequest): Promise<WooCommerceProduct> {
    return super.post<WooCommerceProduct>('products', product)
  }

  /**
   * Updates an existing product
   *
   * @param productId - Product ID
   * @param updates - Product updates
   * @returns Updated product
   */
  async update(productId: number, updates: UpdateProductRequest): Promise<WooCommerceProduct> {
    return super.put<WooCommerceProduct>(`products/${productId}`, updates)
  }

  /**
   * Deletes a product
   *
   * @param productId - Product ID
   * @param force - Whether to permanently delete (true) or move to trash (false)
   * @returns Deleted product
   */
  async deleteProduct(productId: number, force: boolean = false): Promise<WooCommerceProduct> {
    return super.delete<WooCommerceProduct>(`products/${productId}`, { force })
  }

  /**
   * Performs batch operations on products
   *
   * @param batch - Batch operation data
   * @returns Batch operation results
   */
  async batch(batch: BatchProductsRequest): Promise<BatchProductsResponse> {
    return super.post<BatchProductsResponse>('products/batch', batch)
  }

  /**
   * Helper: Retrieves all products with automatic pagination
   *
   * @param status - Product status filter (default: 'publish')
   * @param perPage - Items per page (default: 100, max: 100)
   * @returns Array of all products
   */
  async getAll(
    status: 'publish' | 'draft' | 'pending' | 'private' | 'any' = 'publish',
    perPage: number = 100
  ): Promise<WooCommerceProduct[]> {
    const allProducts: WooCommerceProduct[] = []
    let page = 1
    let hasMore = true

    while (hasMore) {
      const products = await this.list({
        status: status === 'any' ? undefined : status,
        per_page: perPage,
        page,
      })

      allProducts.push(...products)

      // Check if there are more pages
      if (products.length < perPage) {
        hasMore = false
      } else {
        page++
      }
    }

    return allProducts
  }

  /**
   * Lists all products with automatic pagination
   *
   * @param params - Query parameters for filtering
   * @returns Array of all products
   */
  async listAll(params?: ListProductsParams): Promise<WooCommerceProduct[]> {
    const allProducts: WooCommerceProduct[] = []
    let page = 1
    let hasMore = true
    const perPage = params?.per_page ?? 100

    while (hasMore) {
      const products = await this.list({
        ...params,
        per_page: perPage,
        page,
      })

      allProducts.push(...products)

      // Check if there are more pages
      if (products.length < perPage) {
        hasMore = false
      } else {
        page++
      }
    }

    return allProducts
  }

  /**
   * Batch update products (for stock sync)
   * Automatically handles splitting into batches of 100 items (WooCommerce limit)
   * and applies rate limiting between batches
   *
   * @param updates - Array of product updates (id + stock_quantity)
   * @returns Batch operation response
   */
  async batchUpdate(
    updates: Array<{ id: number; stock_quantity: number }>
  ): Promise<BatchProductsResponse> {
    if (updates.length === 0) {
      return { update: [] }
    }

    // WooCommerce batch API accepts max 100 items
    const BATCH_SIZE = 100
    const batches: Array<typeof updates> = []

    for (let i = 0; i < updates.length; i += BATCH_SIZE) {
      batches.push(updates.slice(i, i + BATCH_SIZE))
    }

    const allResults: WooCommerceProduct[] = []

    for (let i = 0; i < batches.length; i++) {
      const batch = batches[i]
      if (!batch) continue // Skip if batch is undefined

      const batchRequest: BatchProductsRequest = {
        update: batch.map(item => ({
          id: item.id,
          stock_quantity: item.stock_quantity,
          manage_stock: true, // Enable stock management
        })),
      }

      const response = await super.post<BatchProductsResponse>('products/batch', batchRequest)

      if (response.update) {
        allResults.push(...response.update)
      }

      // Rate limiting: Wait between batches (except after last batch)
      if (i < batches.length - 1) {
        const delayMs = parseInt(process.env.WOOCOMMERCE_RATE_LIMIT_DELAY_MS || '100', 10)
        await new Promise(resolve => setTimeout(resolve, delayMs))
      }
    }

    return { update: allResults }
  }
}
