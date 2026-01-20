/**
 * Product Tag types and interfaces for WooCommerce REST API
 */

import type { MetaData, Links, ListParams } from './common'

/**
 * Complete WooCommerce Product Tag entity
 */
export interface WooCommerceTag {
  /**
   * Unique tag ID (read-only)
   */
  id: number

  /**
   * Tag name
   */
  name: string

  /**
   * Tag slug
   */
  slug: string

  /**
   * Tag description
   */
  description: string

  /**
   * Number of products with this tag (read-only)
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
 * Tag creation request
 */
export interface CreateTagRequest {
  /**
   * Tag name (required)
   */
  name: string

  /**
   * Tag slug
   */
  slug?: string

  /**
   * Tag description
   */
  description?: string

  /**
   * Meta data
   */
  meta_data?: Array<{ key: string; value: string | number | boolean }>
}

/**
 * Tag update request (all fields optional)
 */
export type UpdateTagRequest = Partial<CreateTagRequest>

/**
 * Tag list query parameters
 */
export interface ListTagsParams extends ListParams {
  /**
   * Limit result set to tags with no products
   */
  hide_empty?: boolean

  /**
   * Limit result set to tags assigned a specific product
   */
  product?: number

  /**
   * Limit result set to tags assigned a specific slug
   */
  slug?: string

  /**
   * Sort by attribute
   * Options: 'id', 'include', 'name', 'slug', 'term_group', 'description', 'count'
   */
  orderby?: 'id' | 'include' | 'name' | 'slug' | 'term_group' | 'description' | 'count'
}

/**
 * Batch tag operation
 */
export interface BatchTagsRequest {
  /**
   * Tags to create
   */
  create?: CreateTagRequest[]

  /**
   * Tags to update (must include ID)
   */
  update?: Array<UpdateTagRequest & { id: number }>

  /**
   * Tag IDs to delete
   */
  delete?: number[]
}

/**
 * Batch tag operation response
 */
export interface BatchTagsResponse {
  /**
   * Created tags
   */
  create: WooCommerceTag[]

  /**
   * Updated tags
   */
  update: WooCommerceTag[]

  /**
   * Deleted tags
   */
  delete: WooCommerceTag[]
}
