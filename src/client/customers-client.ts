/**
 * Customers API client for WooCommerce REST API
 */

import { BaseClient } from './base-client'
import type {
  WooCommerceCustomer,
  CreateCustomerRequest,
  UpdateCustomerRequest,
  ListCustomersParams,
  BatchCustomersRequest,
  BatchCustomersResponse,
  CustomerDownload,
} from '../types/customers'

/**
 * Client for managing customers
 */
export class CustomersClient extends BaseClient {
  /**
   * Lists all customers
   *
   * @param params - Query parameters for filtering and pagination
   * @returns Array of customers
   */
  async list(params?: ListCustomersParams): Promise<WooCommerceCustomer[]> {
    return super.get<WooCommerceCustomer[]>('customers', params)
  }

  /**
   * Retrieves a single customer by ID
   *
   * @param customerId - Customer ID
   * @returns Customer object
   */
  async getCustomer(customerId: number): Promise<WooCommerceCustomer> {
    return super.get<WooCommerceCustomer>(`customers/${customerId}`)
  }

  /**
   * Creates a new customer
   *
   * @param customer - Customer data
   * @returns Created customer
   */
  async create(customer: CreateCustomerRequest): Promise<WooCommerceCustomer> {
    return super.post<WooCommerceCustomer>('customers', customer)
  }

  /**
   * Updates an existing customer
   *
   * @param customerId - Customer ID
   * @param updates - Customer updates
   * @returns Updated customer
   */
  async update(customerId: number, updates: UpdateCustomerRequest): Promise<WooCommerceCustomer> {
    return super.put<WooCommerceCustomer>(`customers/${customerId}`, updates)
  }

  /**
   * Deletes a customer
   *
   * @param customerId - Customer ID
   * @param force - Whether to permanently delete (true) or reassign (false)
   * @param reassign - User ID to reassign customer's orders to (required if force=false)
   * @returns Deleted customer
   */
  async deleteCustomer(
    customerId: number,
    force: boolean = false,
    reassign?: number
  ): Promise<WooCommerceCustomer> {
    const params: Record<string, any> = { force }
    if (reassign !== undefined) {
      params.reassign = reassign
    }
    return super.delete<WooCommerceCustomer>(`customers/${customerId}`, params)
  }

  /**
   * Performs batch operations on customers
   *
   * @param batch - Batch operation data
   * @returns Batch operation results
   */
  async batch(batch: BatchCustomersRequest): Promise<BatchCustomersResponse> {
    return super.post<BatchCustomersResponse>('customers/batch', batch)
  }

  /**
   * Lists all downloadable files for a customer
   *
   * @param customerId - Customer ID
   * @returns Array of customer downloads
   */
  async listDownloads(customerId: number): Promise<CustomerDownload[]> {
    return super.get<CustomerDownload[]>(`customers/${customerId}/downloads`)
  }

  /**
   * Helper: Finds a customer by email
   *
   * @param email - Customer email address
   * @returns Customer object or null if not found
   */
  async findByEmail(email: string): Promise<WooCommerceCustomer | null> {
    const customers = await this.list({ email, per_page: 1 })
    return customers[0] ?? null
  }
}
