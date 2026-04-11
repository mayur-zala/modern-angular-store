import { DialogRef } from '@angular/cdk/dialog';
import { Component, inject, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatAnchor, MatIconButton } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogClose } from '@angular/material/dialog';
import { MatFormField, MatPrefix, MatSuffix } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { EcommerceStore } from '../../ecommerce-store';
import { SignInDialog } from '../sign-in-dialog/sign-in-dialog';
import { SignUpParams } from '../../models/user-type';

@Component({
  selector: 'app-sign-up-dialog',
  imports: [
    MatIconButton,
    MatIcon,
    MatDialogClose,
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatPrefix,
    MatSuffix,
    MatAnchor,
  ],
  template: ` <div class="p-8 max-w-[400px] flex flex-col">
    <div class="flex justify-between">
      <div>
        <h2 class="text-xl font-medium mb-1">Sign Up</h2>
        <p class="text-sm text-gray-500">Join us and start shopping today</p>
      </div>
      <button tabIndex="-1" mat-dialog-close class="-mt-2 -mr-2" matIconButton>
        <mat-icon>close</mat-icon>
      </button>
    </div>
    <form [formGroup]="signUpForm" class="mt-5" (ngSubmit)="signUp()">
      <mat-form-field class="w-full mb-4">
        <input matInput type="name" formControlName="email" placeholder="Enter your name" />
        <mat-icon matPrefix>person</mat-icon>
      </mat-form-field>
      <mat-form-field class="w-full mb-4">
        <input matInput type="email" formControlName="email" placeholder="Enter your email" />
        <mat-icon matPrefix>email</mat-icon>
      </mat-form-field>
      <mat-form-field class="w-full mb-6">
        <input
          matInput
          formControlName="password"
          placeholder="Enter your password"
          [type]="passwordVisible() ? 'text' : 'password'"
        />
        <mat-icon matPrefix>lock</mat-icon>
        <button
          matSuffix
          matIconButton
          class="mr-2"
          (click)="passwordVisible.set(!passwordVisible())"
        >
          <mat-icon matPrefix>{{ passwordVisible() ? 'visibility_off' : 'visibility' }}</mat-icon>
        </button>
      </mat-form-field>
      <mat-form-field class="w-full mb-6">
        <input
          matInput
          formControlName="confirmPassword"
          placeholder="Confirm your password"
          [type]="passwordVisible() ? 'text' : 'password'"
        />
        <mat-icon matPrefix>lock</mat-icon>
        <button
          matSuffix
          matIconButton
          class="mr-2"
          (click)="passwordVisible.set(!passwordVisible())"
        >
          <mat-icon matPrefix>{{ passwordVisible() ? 'visibility_off' : 'visibility' }}</mat-icon>
        </button>
      </mat-form-field>
      <button type="submit" matButton="filled" class="w-full">Create Account</button>
    </form>

    <p class="text-sm text-gray-500 mt-2 text-center">
      Already have an account?
      <a class="text-blue-600 cursor-pointer" (click)="openSignInDialog()">Sign Up</a>
    </p>
  </div>`,
  styles: ``,
})
export class SignUpDialog {
  fb = inject(NonNullableFormBuilder);
  store = inject(EcommerceStore);
  signUpForm = this.fb.group({
    name: ['John Doe', Validators.required],
    email: ['johnd@test.com', Validators.required],
    password: ['test123', Validators.required],
    confirmPassword: ['test123', Validators.required],
  });
  passwordVisible = signal<boolean>(false);
  data = inject<{ checkout: boolean }>(MAT_DIALOG_DATA);
  dialogRef = inject(DialogRef);
  matDialog = inject(MatDialog);

  signUp(): void {
    if (!this.signUpForm.valid) {
      this.signUpForm.markAllAsTouched();
      return;
    }

    const { email, password, name } = this.signUpForm.value;
    this.store.signUp({
      email,
      password,
      name,
      checkOut: this.data.checkout,
      dialogId: this.dialogRef.id,
    } as SignUpParams);
  }

  openSignInDialog(): void {
    this.dialogRef.close();
    this.matDialog.open(SignInDialog);
  }
}
