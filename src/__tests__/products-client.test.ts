/**
 * Tests for ProductsClient
 */

import { describe, it, expect, beforeEach, afterEach, afterAll } from 'vitest'
import { ProductsClient } from '../client/products-client'
import { mockConfig, mockFetchResponse, mockFetch, mockProduct } from './setup'

describe('ProductsClient', () => {
  let client: ProductsClient
  let originalFetch: typeof global.fetch

  beforeEach(() => {
    originalFetch = global.fetch
    client = new ProductsClient(mockConfig)
  })

  afterEach(() => {
    global.fetch = originalFetch
  })

  afterAll(() => {
    // Force cleanup of any lingering references
    global.fetch = originalFetch
  })

  describe('list', () => {
    it('should list products', async () => {
      const products = [mockProduct, { ...mockProduct, id: 124 }]
      mockFetch(mockFetchResponse(products))

      const result = await client.list()

      expect(result).toEqual(products)
      expect(result).toHaveLength(2)
    })

    it('should list products with query parameters', async () => {
      const products = [mockProduct]
      mockFetch(mockFetchResponse(products))

      const result = await client.list({
        per_page: 50,
        status: 'publish',
        type: 'simple',
      })

      expect(result).toEqual(products)
    })
  })

  describe('getProduct', () => {
    it('should retrieve a single product', async () => {
      mockFetch(mockFetchResponse(mockProduct))

      const result = await client.getProduct(123)

      expect(result).toEqual(mockProduct)
      expect(result.id).toBe(123)
    })
  })

  describe('create', () => {
    it('should create a new product', async () => {
      const newProduct = {
        name: 'New Product',
        type: 'simple' as const,
        regular_price: '29.99',
        sku: 'NEW-SKU',
      }

      const createdProduct = { ...mockProduct, ...newProduct }
      mockFetch(mockFetchResponse(createdProduct, 201))

      const result = await client.create(newProduct)

      expect(result.name).toBe(newProduct.name)
      expect(result.sku).toBe(newProduct.sku)
    })
  })

  describe('update', () => {
    it('should update an existing product', async () => {
      const updates = {
        name: 'Updated Product Name',
        regular_price: '149.99',
      }

      const updatedProduct = { ...mockProduct, ...updates }
      mockFetch(mockFetchResponse(updatedProduct))

      const result = await client.update(123, updates)

      expect(result.name).toBe(updates.name)
      expect(result.regular_price).toBe(updates.regular_price)
    })
  })

  describe('deleteProduct', () => {
    it('should delete a product', async () => {
      mockFetch(mockFetchResponse(mockProduct))

      const result = await client.deleteProduct(123)

      expect(result).toEqual(mockProduct)
    })

    it('should permanently delete a product with force=true', async () => {
      mockFetch(mockFetchResponse(mockProduct))

      const result = await client.deleteProduct(123, true)

      expect(result).toEqual(mockProduct)
    })
  })

  describe('batch', () => {
    it('should perform batch operations', async () => {
      const batchRequest = {
        create: [
          { name: 'Product 1', type: 'simple' as const },
          { name: 'Product 2', type: 'simple' as const },
        ],
        update: [{ id: 123, name: 'Updated Product' }],
        delete: [456],
      }

      const batchResponse = {
        create: [
          { ...mockProduct, id: 200, name: 'Product 1' },
          { ...mockProduct, id: 201, name: 'Product 2' },
        ],
        update: [{ ...mockProduct, id: 123, name: 'Updated Product' }],
        delete: [{ ...mockProduct, id: 456 }],
      }

      mockFetch(mockFetchResponse(batchResponse))

      const result = await client.batch(batchRequest)

      expect(result.create).toHaveLength(2)
      expect(result.update).toHaveLength(1)
      expect(result.delete).toHaveLength(1)
    })
  })

  describe('getAll', () => {
    it('should retrieve all products with auto-pagination', async () => {
      const page1 = Array(100)
        .fill(null)
        .map((_, i) => ({ ...mockProduct, id: i + 1 }))
      const page2 = Array(50)
        .fill(null)
        .map((_, i) => ({ ...mockProduct, id: i + 101 }))

      let callCount = 0
      const mockFn = async () => {
        callCount++
        return mockFetchResponse(callCount === 1 ? page1 : page2)
      }
      global.fetch = mockFn

      const result = await client.getAll('publish')

      expect(result).toHaveLength(150)
      expect(callCount).toBe(2)

      // Explicitly restore fetch
      global.fetch = originalFetch
    })

    it('should stop pagination when results are less than per_page', async () => {
      const products = Array(25)
        .fill(null)
        .map((_, i) => ({ ...mockProduct, id: i + 1 }))

      let callCount = 0
      const mockFn = async () => {
        callCount++
        return mockFetchResponse(products)
      }
      global.fetch = mockFn

      const result = await client.getAll('publish')

      expect(result).toHaveLength(25)
      expect(callCount).toBe(1)

      // Explicitly restore fetch
      global.fetch = originalFetch
    })
  })

  describe('listAll', () => {
    it('should retrieve all products with auto-pagination and custom params', async () => {
      const page1 = Array(100)
        .fill(null)
        .map((_, i) => ({ ...mockProduct, id: i + 1 }))
      const page2 = Array(50)
        .fill(null)
        .map((_, i) => ({ ...mockProduct, id: i + 101 }))

      let callCount = 0
      const mockFn = async () => {
        callCount++
        return mockFetchResponse(callCount === 1 ? page1 : page2)
      }
      global.fetch = mockFn

      const result = await client.listAll({ status: 'publish', type: 'simple' })

      expect(result).toHaveLength(150)
      expect(callCount).toBe(2)

      // Explicitly restore fetch
      global.fetch = originalFetch
    })

    it('should stop pagination when results are less than per_page', async () => {
      const products = Array(25)
        .fill(null)
        .map((_, i) => ({ ...mockProduct, id: i + 1 }))

      let callCount = 0
      const mockFn = async () => {
        callCount++
        return mockFetchResponse(products)
      }
      global.fetch = mockFn

      const result = await client.listAll()

      expect(result).toHaveLength(25)
      expect(callCount).toBe(1)

      // Explicitly restore fetch
      global.fetch = originalFetch
    })

    it('should use custom per_page from params', async () => {
      const products = Array(10)
        .fill(null)
        .map((_, i) => ({ ...mockProduct, id: i + 1 }))

      let callCount = 0
      const mockFn = async () => {
        callCount++
        // Return products on first call, empty array on subsequent calls to signal end
        return mockFetchResponse(callCount === 1 ? products : [])
      }
      global.fetch = mockFn

      const result = await client.listAll({ per_page: 10 })

      expect(result).toHaveLength(10)
      // Called twice: once returns 10 (equal to per_page), once returns 0 to signal end
      expect(callCount).toBe(2)

      // Explicitly restore fetch
      global.fetch = originalFetch
    })
  })
})
