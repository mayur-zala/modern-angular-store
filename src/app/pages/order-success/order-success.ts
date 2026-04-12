import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { ViewPanel } from '../../directives/view-panel';
import { EcommerceStore } from '../../ecommerce-store';

@Component({
  selector: 'app-order-success',
  imports: [RouterLink, MatButton, MatIcon, ViewPanel],
  template: `
    <div class="mx-auto max-w-[800px] py-10 px-4 flex flex-col gap-6">
      <!-- Success Banner -->
      <div class="flex flex-col items-center gap-3 py-8 text-center">
        <div class="bg-green-100 rounded-full p-5">
          <mat-icon class="text-green-600 !text-5xl !w-12 !h-12">check_circle</mat-icon>
        </div>
        <h1 class="text-3xl font-bold text-gray-900">Order Placed!</h1>
        <p class="text-gray-500">
          Thank you for your order. We'll send you a confirmation email shortly.
        </p>
        @if (order()) {
          <div class="text-sm text-gray-400 font-mono">Order ID: {{ order()!.orderId }}</div>
        }
      </div>

      @if (order()) {
        <!-- Items Ordered -->
        <div appViewPanel>
          <h2 class="text-xl font-semibold mb-2">Items Ordered</h2>
          <div class="flex flex-col divide-y">
            @for (item of order()!.items; track item.product.id) {
              <div class="flex items-center gap-4 py-4">
                <img
                  class="w-16 h-16 rounded-lg object-cover shrink-0"
                  [src]="item.product.imageUrl"
                  [alt]="item.product.name"
                />
                <div class="flex-1 min-w-0">
                  <div class="font-semibold text-gray-900 truncate">{{ item.product.name }}</div>
                  <div class="text-sm text-gray-500">Qty: {{ item.quantity }}</div>
                </div>
                <div class="font-semibold shrink-0">
                  \${{ (item.product.price * item.quantity).toFixed(2) }}
                </div>
              </div>
            }
          </div>
        </div>

        <!-- Delivery Address -->
        <div appViewPanel>
          <h2 class="text-xl font-semibold mb-3">Delivery Address</h2>
          <div class="text-gray-700 flex flex-col gap-1">
            <div class="font-medium">{{ order()!.deliveryInfo.name }}</div>
            <div>{{ order()!.deliveryInfo.addressLine }}</div>
            <div>
              {{ order()!.deliveryInfo.city }}, {{ order()!.deliveryInfo.state }}
              {{ order()!.deliveryInfo.zipCode }}
            </div>
            <div class="text-gray-500 mt-1">{{ order()!.deliveryInfo.phone }}</div>
          </div>
        </div>

        <!-- Order Total -->
        <div appViewPanel>
          <h2 class="text-xl font-semibold mb-4">Order Total</h2>
          <div class="space-y-3 text-lg pt-4 border-t">
            <div class="flex justify-between">
              <span>Subtotal</span>
              <span>\${{ order()!.subTotal }}</span>
            </div>
            <div class="flex justify-between">
              <span>Tax (5%)</span>
              <span>\${{ order()!.tax }}</span>
            </div>
            <div class="flex justify-between border-t pt-3 font-bold text-lg">
              <span>Total</span>
              <span>\${{ order()!.total }}</span>
            </div>
          </div>
        </div>
      } @else {
        <div class="text-center text-gray-400 py-12">No recent order found.</div>
      }

      <!-- CTA -->
      <div class="flex justify-center pt-2">
        <button matButton="filled" routerLink="/products/all" class="px-8 py-3">
          Continue Shopping
        </button>
      </div>
    </div>
  `,
  styles: ``,
})
export default class OrderSuccess {
  store = inject(EcommerceStore);
  order = this.store.lastOrder;
}
