/**
 * Product Category types and interfaces for WooCommerce REST API
 */

import type { WooCommerceImage, MetaData, Links, ListParams } from './common'

/**
 * Category display type
 */
export type CategoryDisplay = 'default' | 'products' | 'subcategories' | 'both'

/**
 * Complete WooCommerce Product Category entity
 */
export interface WooCommerceCategory {
  /**
   * Unique category ID (read-only)
   */
  id: number

  /**
   * Category name
   */
  name: string

  /**
   * Category slug
   */
  slug: string

  /**
   * Parent category ID
   */
  parent: number

  /**
   * Category description
   */
  description: string

  /**
   * Category archive display type
   */
  display: CategoryDisplay

  /**
   * Category image
   */
  image: WooCommerceImage | null

  /**
   * Menu order for custom sorting
   */
  menu_order: number

  /**
   * Number of products in category (read-only)
   */
  count: number

  /**
   * Meta data
   */
  meta_data: MetaData[]

  /**
   * HATEOAS links (read-only)
   */
  _links?: Links
}

/**
 * Category creation request
 */
export interface CreateCategoryRequest {
  /**
   * Category name (required)
   */
  name: string

  /**
   * Category slug
   */
  slug?: string

  /**
   * Parent category ID
   */
  parent?: number

  /**
   * Category description
   */
  description?: string

  /**
   * Category display type
   */
  display?: CategoryDisplay

  /**
   * Category image
   */
  image?: {
    src: string
    name?: string
    alt?: string
  }

  /**
   * Menu order
   */
  menu_order?: number

  /**
   * Meta data
   */
  meta_data?: Array<{ key: string; value: string | number | boolean }>
}

/**
 * Category update request (all fields optional)
 */
export type UpdateCategoryRequest = Partial<CreateCategoryRequest>

/**
 * Category list query parameters
 */
export interface ListCategoriesParams extends ListParams {
  /**
   * Limit result set to categories assigned a specific parent
   */
  parent?: number

  /**
   * Limit result set to categories with no products
   */
  hide_empty?: boolean

  /**
   * Limit result set to categories assigned a specific product
   */
  product?: number

  /**
   * Limit result set to categories assigned a specific slug
   */
  slug?: string

  /**
   * Sort by attribute
   * Options: 'id', 'include', 'name', 'slug', 'term_group', 'description', 'count'
   */
  orderby?: 'id' | 'include' | 'name' | 'slug' | 'term_group' | 'description' | 'count'
}

/**
 * Batch category operation
 */
export interface BatchCategoriesRequest {
  /**
   * Categories to create
   */
  create?: CreateCategoryRequest[]

  /**
   * Categories to update (must include ID)
   */
  update?: Array<UpdateCategoryRequest & { id: number }>

  /**
   * Category IDs to delete
   */
  delete?: number[]
}

/**
 * Batch category operation response
 */
export interface BatchCategoriesResponse {
  /**
   * Created categories
   */
  create: WooCommerceCategory[]

  /**
   * Updated categories
   */
  update: WooCommerceCategory[]

  /**
   * Deleted categories
   */
  delete: WooCommerceCategory[]
}
