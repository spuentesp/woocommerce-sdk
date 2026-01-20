/**
 * Product types and interfaces for WooCommerce REST API
 */

import type {
  WooCommerceImage,
  Dimensions,
  CategoryRef,
  TagRef,
  MetaData,
  Links,
  ListParams,
} from './common'

/**
 * Product type enumeration
 */
export type ProductType = 'simple' | 'grouped' | 'external' | 'variable'

/**
 * Product status enumeration
 */
export type ProductStatus = 'draft' | 'pending' | 'private' | 'publish'

/**
 * Product catalog visibility options
 */
export type CatalogVisibility = 'visible' | 'catalog' | 'search' | 'hidden'

/**
 * Product tax status
 */
export type TaxStatus = 'taxable' | 'shipping' | 'none'

/**
 * Product backorders options
 */
export type BackordersOption = 'no' | 'notify' | 'yes'

/**
 * Stock status
 */
export type StockStatus = 'instock' | 'outofstock' | 'onbackorder'

/**
 * Product attribute object
 */
export interface ProductAttribute {
  /**
   * Attribute ID
   */
  id: number

  /**
   * Attribute name
   */
  name: string

  /**
   * Attribute position
   */
  position: number

  /**
   * Whether attribute is visible on product page
   */
  visible: boolean

  /**
   * Whether attribute is for variations
   */
  variation: boolean

  /**
   * Attribute options/values
   */
  options: string[]
}

/**
 * Product default attribute (for variable products)
 */
export interface DefaultAttribute {
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
 * Product download object
 */
export interface ProductDownload {
  /**
   * Download ID
   */
  id: string

  /**
   * Download name
   */
  name: string

  /**
   * Download file URL
   */
  file: string
}

/**
 * Complete WooCommerce Product entity
 */
export interface WooCommerceProduct {
  /**
   * Unique product ID (read-only)
   */
  id: number

  /**
   * Product name
   */
  name: string

  /**
   * Product slug
   */
  slug: string

  /**
   * Product permalink (read-only)
   */
  permalink: string

  /**
   * Date product was created (GMT, read-only)
   */
  date_created: string

  /**
   * Date product was created (site timezone, read-only)
   */
  date_created_gmt: string

  /**
   * Date product was last modified (GMT, read-only)
   */
  date_modified: string

  /**
   * Date product was last modified (site timezone, read-only)
   */
  date_modified_gmt: string

  /**
   * Product type
   */
  type: ProductType

  /**
   * Product status
   */
  status: ProductStatus

  /**
   * Featured product
   */
  featured: boolean

  /**
   * Catalog visibility
   */
  catalog_visibility: CatalogVisibility

  /**
   * Product description
   */
  description: string

  /**
   * Product short description
   */
  short_description: string

  /**
   * Product SKU
   */
  sku: string

  /**
   * Current product price (read-only)
   */
  price: string

  /**
   * Product regular price
   */
  regular_price: string

  /**
   * Product sale price
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
   * Price formatted with currency symbol (read-only)
   */
  price_html: string

  /**
   * Shows if product is on sale (read-only)
   */
  on_sale: boolean

  /**
   * Shows if product can be purchased (read-only)
   */
  purchasable: boolean

  /**
   * Total sales count (read-only)
   */
  total_sales: number

  /**
   * Whether product is virtual
   */
  virtual: boolean

  /**
   * Whether product is downloadable
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
   * Download type ('standard' or download links sent via email)
   */
  external_url: string

  /**
   * External button text for external products
   */
  button_text: string

  /**
   * Tax status
   */
  tax_status: TaxStatus

  /**
   * Tax class
   */
  tax_class: string

  /**
   * Stock management at product level
   */
  manage_stock: boolean

  /**
   * Stock quantity
   */
  stock_quantity: number | null

  /**
   * Controls backorders
   */
  backorders: BackordersOption

  /**
   * Shows if backorders are allowed (read-only)
   */
  backorders_allowed: boolean

  /**
   * Shows if product is on backorder (read-only)
   */
  backordered: boolean

  /**
   * Shows if low stock notification is active (read-only)
   */
  low_stock_amount: number | null

  /**
   * Allow individual item to be sold separately
   */
  sold_individually: boolean

  /**
   * Product weight
   */
  weight: string

  /**
   * Product dimensions
   */
  dimensions: Dimensions

  /**
   * Shows if product needs shipping (read-only)
   */
  shipping_required: boolean

  /**
   * Shows if product shipping is taxable (read-only)
   */
  shipping_taxable: boolean

  /**
   * Shipping class
   */
  shipping_class: string

  /**
   * Shipping class ID (read-only)
   */
  shipping_class_id: number

  /**
   * Allow reviews
   */
  reviews_allowed: boolean

  /**
   * Average product rating (read-only)
   */
  average_rating: string

  /**
   * Number of reviews (read-only)
   */
  rating_count: number

  /**
   * List of related product IDs (read-only)
   */
  related_ids: number[]

  /**
   * List of up-sell product IDs
   */
  upsell_ids: number[]

  /**
   * List of cross-sell product IDs
   */
  cross_sell_ids: number[]

  /**
   * Parent product ID (for variations)
   */
  parent_id: number

  /**
   * Purchase note
   */
  purchase_note: string

  /**
   * Product categories
   */
  categories: CategoryRef[]

  /**
   * Product tags
   */
  tags: TagRef[]

  /**
   * Product images
   */
  images: WooCommerceImage[]

  /**
   * Product attributes
   */
  attributes: ProductAttribute[]

  /**
   * Default attributes for variable products
   */
  default_attributes: DefaultAttribute[]

  /**
   * List of variation IDs (read-only, for variable products)
   */
  variations: number[]

  /**
   * List of grouped product IDs (for grouped products)
   */
  grouped_products: number[]

  /**
   * Menu order for custom sorting
   */
  menu_order: number

  /**
   * Stock status
   */
  stock_status: StockStatus

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
 * Product creation request
 */
export interface CreateProductRequest {
  /**
   * Product name (required)
   */
  name: string

  /**
   * Product type (default: 'simple')
   */
  type?: ProductType

  /**
   * Product status (default: 'publish')
   */
  status?: ProductStatus

  /**
   * Product slug
   */
  slug?: string

  /**
   * Featured product
   */
  featured?: boolean

  /**
   * Catalog visibility
   */
  catalog_visibility?: CatalogVisibility

  /**
   * Product description
   */
  description?: string

  /**
   * Product short description
   */
  short_description?: string

  /**
   * Product SKU
   */
  sku?: string

  /**
   * Product regular price
   */
  regular_price?: string

  /**
   * Product sale price
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
   * Whether product is virtual
   */
  virtual?: boolean

  /**
   * Whether product is downloadable
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
   * External product URL
   */
  external_url?: string

  /**
   * External button text
   */
  button_text?: string

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
   * Backorders option
   */
  backorders?: BackordersOption

  /**
   * Low stock threshold
   */
  low_stock_amount?: number

  /**
   * Sold individually
   */
  sold_individually?: boolean

  /**
   * Product weight
   */
  weight?: string

  /**
   * Product dimensions
   */
  dimensions?: Dimensions

  /**
   * Shipping class
   */
  shipping_class?: string

  /**
   * Allow reviews
   */
  reviews_allowed?: boolean

  /**
   * Up-sell product IDs
   */
  upsell_ids?: number[]

  /**
   * Cross-sell product IDs
   */
  cross_sell_ids?: number[]

  /**
   * Parent product ID
   */
  parent_id?: number

  /**
   * Purchase note
   */
  purchase_note?: string

  /**
   * Product categories
   */
  categories?: Array<{ id: number }>

  /**
   * Product tags
   */
  tags?: Array<{ id: number }>

  /**
   * Product images
   */
  images?: Array<{ src: string; name?: string; alt?: string }>

  /**
   * Product attributes
   */
  attributes?: ProductAttribute[]

  /**
   * Default attributes
   */
  default_attributes?: DefaultAttribute[]

  /**
   * Grouped product IDs
   */
  grouped_products?: number[]

  /**
   * Menu order
   */
  menu_order?: number

  /**
   * Stock status
   */
  stock_status?: StockStatus

  /**
   * Meta data
   */
  meta_data?: Array<{ key: string; value: string | number | boolean }>
}

/**
 * Product update request (all fields optional)
 */
export type UpdateProductRequest = Partial<CreateProductRequest>

/**
 * Product list query parameters
 */
export interface ListProductsParams extends ListParams {
  /**
   * Limit result set to products assigned a specific slug
   */
  slug?: string

  /**
   * Limit result set to products assigned a specific status
   */
  status?: ProductStatus

  /**
   * Limit result set to products assigned a specific type
   */
  type?: ProductType

  /**
   * Limit result set to products assigned a specific SKU
   */
  sku?: string

  /**
   * Limit result set to featured products
   */
  featured?: boolean

  /**
   * Limit result set to products assigned a specific category ID
   */
  category?: string

  /**
   * Limit result set to products assigned a specific tag ID
   */
  tag?: string

  /**
   * Limit result set to products assigned a specific shipping class ID
   */
  shipping_class?: string

  /**
   * Limit result set to products with a specific attribute
   */
  attribute?: string

  /**
   * Limit result set to products with a specific attribute term ID
   */
  attribute_term?: string

  /**
   * Limit result set to products with a specific tax class (default is 'standard')
   */
  tax_class?: string

  /**
   * Limit result set to products on sale
   */
  on_sale?: boolean

  /**
   * Limit result set to products with a specific min price
   */
  min_price?: string

  /**
   * Limit result set to products with a specific max price
   */
  max_price?: string

  /**
   * Limit result set to products in stock or out of stock
   */
  stock_status?: StockStatus

  /**
   * Limit result set to products with or without parent
   */
  parent?: number

  /**
   * Limit result set to products except those from a specific parent
   */
  parent_exclude?: number[]

  /**
   * Sort by attribute (default: 'date')
   * Options: 'date', 'id', 'include', 'title', 'slug', 'price', 'popularity', 'rating'
   */
  orderby?: 'date' | 'id' | 'include' | 'title' | 'slug' | 'price' | 'popularity' | 'rating'
}

/**
 * Batch product operation
 */
export interface BatchProductsRequest {
  /**
   * Products to create
   */
  create?: CreateProductRequest[]

  /**
   * Products to update (must include ID)
   */
  update?: Array<UpdateProductRequest & { id: number }>

  /**
   * Product IDs to delete
   */
  delete?: number[]
}

/**
 * Batch product operation response
 */
export interface BatchProductsResponse {
  /**
   * Created products
   */
  create?: WooCommerceProduct[]

  /**
   * Updated products
   */
  update?: WooCommerceProduct[]

  /**
   * Deleted products
   */
  delete?: WooCommerceProduct[]
}
