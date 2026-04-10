import { Component, computed, inject, input } from '@angular/core';
import { EcommerceStore } from '../../ecommerce-store';
import { Product } from '../../models/product-type';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';

@Component({
  selector: 'app-toggle-wishlist-button',
  imports: [MatIcon, MatIconButton],
  template: `<button
    matIconButton
    class="!absolute z-10 top-3 right-3 w-10 h-10 rounded-xl !bg-white border-0 shadow-md flex items-center justify-center cursor-pointer transition-all duration-200 hover:scale-110 hover:shadow-lg"
    [class]="{ '!text-red-500': isInWishList(), '!text-gray-400': !isInWishList() }"
    (click)="toggleWishList(product())"
  >
    <mat-icon>{{ isInWishList() ? 'favorite' : 'favorite_border' }}</mat-icon>
  </button>`,
  styles: ``,
})
export class ToggleWishlistButton {
  product = input.required<Product>();
  store = inject(EcommerceStore);
  isInWishList = computed(() => this.store.wishListItems().find((w) => w.id === this.product().id));

  toggleWishList(product: Product): void {
    if (this.isInWishList()) {
      this.store.removeFromWishList(product);
    } else {
      this.store.addToWishList(product);
    }
  }
}
