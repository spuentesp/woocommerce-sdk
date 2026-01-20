/**
 * Product Variation types and interfaces for WooCommerce REST API
 */

import type { WooCommerceImage, Dimensions, MetaData, Links, ListParams } from './common'
import type { TaxStatus, BackordersOption, StockStatus, ProductDownload } from './products'

/**
 * Variation attribute object
 */
export interface VariationAttribute {
  /**
   * Attribute ID
   */
  id: number

  /**
   * Attribute name
   */
  name: string

  /**
   * Selected attribute option
   */
  option: string
}

/**
 * Complete WooCommerce Product Variation entity
 */
export interface WooCommerceVariation {
  /**
   * Unique variation ID (read-only)
   */
  id: number

  /**
   * Date variation was created (GMT, read-only)
   */
  date_created: string

  /**
   * Date variation was created (site timezone, read-only)
   */
  date_created_gmt: string

  /**
   * Date variation was last modified (GMT, read-only)
   */
  date_modified: string

  /**
   * Date variation was last modified (site timezone, read-only)
   */
  date_modified_gmt: string

  /**
   * Variation description
   */
  description: string

  /**
   * Variation permalink (read-only)
   */
  permalink: string

  /**
   * Variation SKU
   */
  sku: string

  /**
   * Current variation price (read-only)
   */
  price: string

  /**
   * Variation regular price
   */
  regular_price: string

  /**
   * Variation sale price
   */
  sale_price: string

  /**
   * Start date of sale price (GMT)
   */
  date_on_sale_from: string | null

  /**
   * Start date of sale price (site timezone)
   */
  date_on_sale_from_gmt: string | null

  /**
   * End date of sale price (GMT)
   */
  date_on_sale_to: string | null

  /**
   * End date of sale price (site timezone)
   */
  date_on_sale_to_gmt: string | null

  /**
   * Shows if variation is on sale (read-only)
   */
  on_sale: boolean

  /**
   * Shows if variation can be purchased (read-only)
   */
  purchasable: boolean

  /**
   * Whether variation is virtual
   */
  virtual: boolean

  /**
   * Whether variation is downloadable
   */
  downloadable: boolean

  /**
   * List of downloadable files
   */
  downloads: ProductDownload[]

  /**
   * Download limit (-1 for unlimited)
   */
  download_limit: number

  /**
   * Download expiry in days (-1 for never expires)
   */
  download_expiry: number

  /**
   * Tax status
   */
  tax_status: TaxStatus

  /**
   * Tax class
   */
  tax_class: string

  /**
   * Stock management at variation level
   */
  manage_stock: boolean

  /**
   * Stock quantity
   */
  stock_quantity: number | null

  /**
   * Stock status
   */
  stock_status: StockStatus

  /**
   * Controls backorders
   */
  backorders: BackordersOption

  /**
   * Shows if backorders are allowed (read-only)
   */
  backorders_allowed: boolean

  /**
   * Shows if variation is on backorder (read-only)
   */
  backordered: boolean

  /**
   * Low stock threshold
   */
  low_stock_amount: number | null

  /**
   * Variation weight
   */
  weight: string

  /**
   * Variation dimensions
   */
  dimensions: Dimensions

  /**
   * Shipping class
   */
  shipping_class: string

  /**
   * Shipping class ID (read-only)
   */
  shipping_class_id: number

  /**
   * Variation image
   */
  image: WooCommerceImage | null

  /**
   * List of variation attributes
   */
  attributes: VariationAttribute[]

  /**
   * Menu order for custom sorting
   */
  menu_order: number

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
 * Variation creation request
 */
export interface CreateVariationRequest {
  /**
   * Variation description
   */
  description?: string

  /**
   * Variation SKU
   */
  sku?: string

  /**
   * Variation regular price
   */
  regular_price?: string

  /**
   * Variation sale price
   */
  sale_price?: string

  /**
   * Start date of sale price
   */
  date_on_sale_from?: string

  /**
   * Start date of sale price (GMT)
   */
  date_on_sale_from_gmt?: string

  /**
   * End date of sale price
   */
  date_on_sale_to?: string

  /**
   * End date of sale price (GMT)
   */
  date_on_sale_to_gmt?: string

  /**
   * Whether variation is virtual
   */
  virtual?: boolean

  /**
   * Whether variation is downloadable
   */
  downloadable?: boolean

  /**
   * List of downloadable files
   */
  downloads?: ProductDownload[]

  /**
   * Download limit
   */
  download_limit?: number

  /**
   * Download expiry in days
   */
  download_expiry?: number

  /**
   * Tax status
   */
  tax_status?: TaxStatus

  /**
   * Tax class
   */
  tax_class?: string

  /**
   * Stock management
   */
  manage_stock?: boolean

  /**
   * Stock quantity
   */
  stock_quantity?: number

  /**
   * Stock status
   */
  stock_status?: StockStatus

  /**
   * Backorders option
   */
  backorders?: BackordersOption

  /**
   * Low stock threshold
   */
  low_stock_amount?: number

  /**
   * Variation weight
   */
  weight?: string

  /**
   * Variation dimensions
   */
  dimensions?: Dimensions

  /**
   * Shipping class
   */
  shipping_class?: string

  /**
   * Variation image
   */
  image?: {
    id?: number
    src?: string
    name?: string
    alt?: string
  }

  /**
   * List of variation attributes (required for creation)
   */
  attributes?: VariationAttribute[]

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
 * Variation update request (all fields optional)
 */
export type UpdateVariationRequest = Partial<CreateVariationRequest>

/**
 * Variation list query parameters
 */
export interface ListVariationsParams extends ListParams {
  /**
   * Limit result set to variations assigned a specific slug
   */
  slug?: string

  /**
   * Limit result set to variations assigned a specific SKU
   */
  sku?: string

  /**
   * Limit result set to variations on sale
   */
  on_sale?: boolean

  /**
   * Limit result set to variations with a specific min price
   */
  min_price?: string

  /**
   * Limit result set to variations with a specific max price
   */
  max_price?: string

  /**
   * Limit result set to variations in stock or out of stock
   */
  stock_status?: StockStatus

  /**
   * Sort by attribute (default: 'menu_order')
   * Options: 'date', 'id', 'include', 'title', 'slug', 'menu_order'
   */
  orderby?: 'date' | 'id' | 'include' | 'title' | 'slug' | 'menu_order'
}

/**
 * Batch variation operation
 */
export interface BatchVariationsRequest {
  /**
   * Variations to create
   */
  create?: CreateVariationRequest[]

  /**
   * Variations to update (must include ID)
   */
  update?: Array<UpdateVariationRequest & { id: number }>

  /**
   * Variation IDs to delete
   */
  delete?: number[]
}

/**
 * Batch variation operation response
 */
export interface BatchVariationsResponse {
  /**
   * Created variations
   */
  create: WooCommerceVariation[]

  /**
   * Updated variations
   */
  update: WooCommerceVariation[]

  /**
   * Deleted variations
   */
  delete: WooCommerceVariation[]
}
