import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-empty-wishlist',
  imports: [MatIcon, RouterLink, MatButton],
  template: `
    <div class="flex flex-col items-center justify-center py-16 text-center">
      <div class="w-20 h-20 mb-8 rounded-full bg-gray-100 flex items-center justify-center">
        <mat-icon
          role="img"
          class="mat-icon notranslate text-gray-400 transform scale-150 material-icons mat-ligature-font mat-icon-no-color"
          aria-hidden="true"
          data-mat-icon-type="font"
          >favorite_border</mat-icon
        >
      </div>
      <h2 class="text-2xl font-bold text-gray-900 mb-3">Your wishlist is empty</h2>
      <p class="text-gray-600 mb-8">Save items you love for later!</p>
      <button
        matButton="filled"
        routerLink="/products/all"
        class="mdc-button mat-mdc-button-base min-w-[200px] py-3 mdc-button--unelevated mat-mdc-unelevated-button mat-unthemed"
        mat-ripple-loader-class-name="mat-mdc-button-ripple"
      >
        <span class="mat-mdc-button-persistent-ripple mdc-button__ripple"></span
        ><span class="mdc-button__label"> Start Shopping </span
        ><span class="mat-focus-indicator"></span><span class="mat-mdc-button-touch-target"></span
        ><span class="mat-ripple mat-mdc-button-ripple"></span>
      </button>
    </div>
  `,
  styles: ``,
})
export class EmptyWishlist {}
