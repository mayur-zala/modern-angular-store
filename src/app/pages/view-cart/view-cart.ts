import { Component, inject } from '@angular/core';
import { BackButton } from '../../components/back-button/back-button';
import { ListCartItems } from './list-cart-items/list-cart-items';
import { TeaseWishlist } from '../tease-wishlist/tease-wishlist';
import { OrderSummary } from '../../components/order-summary/order-summary';
import { MatAnchor } from '@angular/material/button';
import { EcommerceStore } from '../../ecommerce-store';

@Component({
  selector: 'app-view-cart',
  imports: [BackButton, ListCartItems, TeaseWishlist, OrderSummary, MatAnchor],
  template: `
    <div class="mx-auto max-w-[1200px] py-6 px-4">
      <app-back-button class="mb-6" navigateTo="/products/all">Continue Shopping</app-back-button>

      <h1 class="text-2xl font-bold mb-4">Shopping Cart</h1>

      <app-tease-wishlist class="block mb-6"></app-tease-wishlist>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div class="lg:col-span-2">
          <app-list-cart-items />
        </div>
        <div>
          <app-order-summary>
            <ng-container actionButtons>
              <button
                matButton="filled"
                class="w-full mt-6 p-3"
                (click)="store.proceedToCheckout()"
              >
                Proceed to checkout
              </button>
            </ng-container>
          </app-order-summary>
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export default class ViewCart {
  store = inject(EcommerceStore);
}
