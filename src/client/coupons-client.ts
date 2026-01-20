/**
 * Coupons API client for WooCommerce REST API
 */

import { BaseClient } from './base-client'
import type {
  WooCommerceCoupon,
  CreateCouponRequest,
  UpdateCouponRequest,
  ListCouponsParams,
  BatchCouponsRequest,
  BatchCouponsResponse,
} from '../types/coupons'

/**
 * Client for managing coupons
 */
export class CouponsClient extends BaseClient {
  /**
   * Lists all coupons
   *
   * @param params - Query parameters for filtering and pagination
   * @returns Array of coupons
   */
  async list(params?: ListCouponsParams): Promise<WooCommerceCoupon[]> {
    return super.get<WooCommerceCoupon[]>('coupons', params)
  }

  /**
   * Retrieves a single coupon by ID
   *
   * @param couponId - Coupon ID
   * @returns Coupon object
   */
  async getCoupon(couponId: number): Promise<WooCommerceCoupon> {
    return super.get<WooCommerceCoupon>(`coupons/${couponId}`)
  }

  /**
   * Creates a new coupon
   *
   * @param coupon - Coupon data
   * @returns Created coupon
   */
  async create(coupon: CreateCouponRequest): Promise<WooCommerceCoupon> {
    return super.post<WooCommerceCoupon>('coupons', coupon)
  }

  /**
   * Updates an existing coupon
   *
   * @param couponId - Coupon ID
   * @param updates - Coupon updates
   * @returns Updated coupon
   */
  async update(couponId: number, updates: UpdateCouponRequest): Promise<WooCommerceCoupon> {
    return super.put<WooCommerceCoupon>(`coupons/${couponId}`, updates)
  }

  /**
   * Deletes a coupon
   *
   * @param couponId - Coupon ID
   * @param force - Whether to permanently delete (true) or move to trash (false)
   * @returns Deleted coupon
   */
  async deleteCoupon(couponId: number, force: boolean = false): Promise<WooCommerceCoupon> {
    return super.delete<WooCommerceCoupon>(`coupons/${couponId}`, { force })
  }

  /**
   * Performs batch operations on coupons
   *
   * @param batch - Batch operation data
   * @returns Batch operation results
   */
  async batch(batch: BatchCouponsRequest): Promise<BatchCouponsResponse> {
    return super.post<BatchCouponsResponse>('coupons/batch', batch)
  }

  /**
   * Helper: Finds a coupon by code
   *
   * @param code - Coupon code
   * @returns Coupon object or null if not found
   */
  async findByCode(code: string): Promise<WooCommerceCoupon | null> {
    const coupons = await this.list({ code, per_page: 1 })
    return coupons[0] ?? null
  }
}
