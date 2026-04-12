import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormField, MatLabel, MatError } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { MatRadioGroup, MatRadioButton } from '@angular/material/radio';
import { MatIcon } from '@angular/material/icon';
import { BackButton } from '../../components/back-button/back-button';
import { OrderSummary } from '../../components/order-summary/order-summary';
import { ViewPanel } from '../../directives/view-panel';
import { EcommerceStore } from '../../ecommerce-store';

@Component({
  selector: 'app-checkout',
  imports: [
    BackButton,
    OrderSummary,
    ViewPanel,
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatError,
    MatInput,
    MatButton,
    MatRadioGroup,
    MatRadioButton,
    MatIcon,
  ],
  template: `
    <div class="mx-auto max-w-[1200px] py-6 px-4">
      <app-back-button class="mb-6" navigateTo="/cart">Back to Cart</app-back-button>
      <h1 class="text-2xl font-bold mb-6">Checkout</h1>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div class="lg:col-span-2 flex flex-col gap-6">
          <!-- Contact Information -->
          <div appViewPanel>
            <h2 class="text-xl font-semibold mb-4">Contact Information</h2>
            <form [formGroup]="checkoutForm" class="flex flex-col gap-4">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <mat-form-field>
                  <mat-label>Full Name</mat-label>
                  <input matInput formControlName="name" placeholder="John Doe" />
                  @if (checkoutForm.controls.name.invalid && checkoutForm.controls.name.touched) {
                    <mat-error>Name is required</mat-error>
                  }
                </mat-form-field>
                <mat-form-field>
                  <mat-label>Email</mat-label>
                  <input matInput formControlName="email" type="email" />
                  @if (checkoutForm.controls.email.invalid && checkoutForm.controls.email.touched) {
                    <mat-error>Valid email is required</mat-error>
                  }
                </mat-form-field>
              </div>
              <mat-form-field>
                <mat-label>Phone Number</mat-label>
                <input matInput formControlName="phone" placeholder="+1 234 567 8900" />
                @if (checkoutForm.controls.phone.invalid && checkoutForm.controls.phone.touched) {
                  <mat-error>Phone number is required</mat-error>
                }
              </mat-form-field>
            </form>
          </div>

          <!-- Delivery Address -->
          <div appViewPanel>
            <h2 class="text-xl font-semibold mb-4">Delivery Address</h2>
            <form [formGroup]="checkoutForm" class="flex flex-col gap-4">
              <mat-form-field>
                <mat-label>Address Line</mat-label>
                <input matInput formControlName="addressLine" placeholder="123 Main St, Apt 4B" />
                @if (
                  checkoutForm.controls.addressLine.invalid &&
                  checkoutForm.controls.addressLine.touched
                ) {
                  <mat-error>Address is required</mat-error>
                }
              </mat-form-field>
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <mat-form-field>
                  <mat-label>City</mat-label>
                  <input matInput formControlName="city" />
                  @if (checkoutForm.controls.city.invalid && checkoutForm.controls.city.touched) {
                    <mat-error>City is required</mat-error>
                  }
                </mat-form-field>
                <mat-form-field>
                  <mat-label>State</mat-label>
                  <input matInput formControlName="state" />
                  @if (checkoutForm.controls.state.invalid && checkoutForm.controls.state.touched) {
                    <mat-error>State is required</mat-error>
                  }
                </mat-form-field>
                <mat-form-field>
                  <mat-label>ZIP Code</mat-label>
                  <input matInput formControlName="zipCode" />
                  @if (
                    checkoutForm.controls.zipCode.invalid && checkoutForm.controls.zipCode.touched
                  ) {
                    <mat-error>ZIP code is required</mat-error>
                  }
                </mat-form-field>
              </div>
            </form>
          </div>

          <!-- Payment Method -->
          <div appViewPanel>
            <h2 class="text-xl font-semibold mb-4">Payment Method</h2>
            <mat-radio-group
              [formControl]="checkoutForm.controls.paymentMethod"
              class="flex flex-col gap-3"
            >
              @for (method of paymentMethods; track method.value) {
                <mat-radio-button [value]="method.value">
                  <div class="flex items-center gap-2">
                    <mat-icon>{{ method.icon }}</mat-icon>
                    <span>{{ method.label }}</span>
                  </div>
                </mat-radio-button>
              }
            </mat-radio-group>
          </div>
        </div>

        <!-- Order Summary -->
        <div>
          <app-order-summary>
            <ng-container actionButtons>
              <button
                matButton="filled"
                class="w-full mt-6 p-3"
                (click)="placeOrder()"
              >
                Place Order
              </button>
            </ng-container>
          </app-order-summary>
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export default class Checkout {
  store = inject(EcommerceStore);
  fb = inject(NonNullableFormBuilder);

  checkoutForm = this.fb.group({
    name: [this.store.user()?.name ?? '', Validators.required],
    email: [this.store.user()?.email ?? '', [Validators.required, Validators.email]],
    phone: ['', Validators.required],
    addressLine: ['', Validators.required],
    city: ['', Validators.required],
    state: ['', Validators.required],
    zipCode: ['', Validators.required],
    paymentMethod: ['credit_card', Validators.required],
  });

  paymentMethods = [
    { value: 'credit_card', label: 'Credit Card', icon: 'credit_card' },
    { value: 'debit_card', label: 'Debit Card', icon: 'payment' },
    { value: 'upi', label: 'UPI', icon: 'qr_code' },
  ];

  placeOrder() {
    if (this.checkoutForm.invalid) {
      this.checkoutForm.markAllAsTouched();
      return;
    }
    this.store.placeOrder(this.checkoutForm.getRawValue());
  }
}
