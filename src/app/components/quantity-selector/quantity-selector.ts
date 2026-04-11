import { Component, input, output } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-quantity-selector',
  imports: [MatIconButton, MatIcon],
  template: `
    <div class="flex items-center">
      <div class="inline-flex items-center">
        <button
          matIconButton
          [disabled]="quantity() === 1"
          (click)="quantityUpdated.emit(quantity() - 1)"
        >
          <mat-icon>remove</mat-icon>
        </button>
      </div>
      <div class="px-3">
        {{ quantity() }}
      </div>
      <div class="inline-flex items-center">
        <button matIconButton (click)="quantityUpdated.emit(quantity() + 1)">
          <mat-icon>add</mat-icon>
        </button>
      </div>
    </div>
  `,
  styles: ``,
})
export class QuantitySelector {
  quantity = input(0);
  quantityUpdated = output<number>();
}
