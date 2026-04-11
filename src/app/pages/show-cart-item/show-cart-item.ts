import { Component, computed, inject, input } from '@angular/core';
import { CartItem } from '../../models/cart-type';
import { QuantitySelector } from '../../components/quantity-selector/quantity-selector';
import { EcommerceStore } from '../../ecommerce-store';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-show-cart-item',
  imports: [QuantitySelector, MatIconButton, MatIcon],
  template: `
    <div class="grid grid-cols-3 grid-cols-[3fr_1fr_1fr]">
      <div class="flex items-center gap-4">
        <img
          class="w-24 h-24 rounded-lg object-cover"
          [src]="cartItem().product.imageUrl"
          [alt]="cartItem().product.description"
        />
        <div>
          <div class="text-gray-900 text-lg font-semibold">{{ cartItem().product.name }}</div>
          <div class="text-gray-600 text-lg">\${{ cartItem().product.price }}</div>
        </div>
      </div>
      <app-quantity-selector
        [quantity]="cartItem().quantity"
        (quantityUpdated)="
          store.setItemQuantity({ productId: cartItem().product.id, quantity: $event })
        "
      ></app-quantity-selector>
      <div class="flex flex-col items-end">
        <div class="text-right font-semibold text-lg">\${{ total() }}</div>
        <div class="flex -me-3">
          <button matIconButton (click)="store.moveToWishlist(cartItem().product)">
            <mat-icon>favorite_border</mat-icon>
          </button>
          <button matIconButton class="danger" (click)="store.removeFromCart(cartItem().product)">
            <mat-icon>delete</mat-icon>
          </button>
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export class ShowCartItem {
  cartItem = input.required<CartItem>();
  store = inject(EcommerceStore);
  total = computed(() => (this.cartItem().product.price * this.cartItem().quantity).toFixed(2));
}
