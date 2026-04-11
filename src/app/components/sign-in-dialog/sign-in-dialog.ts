import { Component, inject, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconButton, MatAnchor } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogClose } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { MatFormField, MatPrefix, MatSuffix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { EcommerceStore } from '../../ecommerce-store';
import { SignInParams } from '../../models/user-type';
import { DialogRef } from '@angular/cdk/dialog';
import { SignUpDialog } from '../sign-up-dialog/sign-up-dialog';

@Component({
  selector: 'app-sign-in-dialog',
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
  template: `
    <div class="p-8 max-w-[400px] flex flex-col">
      <div class="flex justify-between">
        <div>
          <h2 class="text-xl font-medium mb-1">Sign In</h2>
          <p class="text-sm text-gray-500">Sign in to your account to continue shopping</p>
        </div>
        <button tabIndex="-1" mat-dialog-close class="-mt-2 -mr-2" matIconButton>
          <mat-icon>close</mat-icon>
        </button>
      </div>
      <form [formGroup]="signInForm" class="mt-5" (ngSubmit)="signIn()">
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
        <button type="submit" matButton="filled" class="w-full">Sign In</button>
      </form>

      <p class="text-sm text-gray-500 mt-2 text-center">
        Don't have an account?
        <a class="text-blue-600 cursor-pointer" (click)="openSignUpDialog()">Sign Up</a>
      </p>
    </div>
  `,
  styles: ``,
})
export class SignInDialog {
  fb = inject(NonNullableFormBuilder);
  store = inject(EcommerceStore);
  signInForm = this.fb.group({
    email: ['johnd@test.com', Validators.required],
    password: ['test123', Validators.required],
  });
  passwordVisible = signal<boolean>(false);
  data = inject<{ checkout: boolean }>(MAT_DIALOG_DATA);
  dialogRef = inject(DialogRef);
  matDialog = inject(MatDialog);

  signIn(): void {
    if (!this.signInForm.valid) {
      this.signInForm.markAllAsTouched();
      return;
    }

    const { email, password } = this.signInForm.value;
    this.store.signIn({
      email,
      password,
      checkOut: this.data.checkout,
      dialogId: this.dialogRef.id,
    } as SignInParams);
  }

  openSignUpDialog(): void {
    this.dialogRef.close();
    this.matDialog.open(SignUpDialog, {
      disableClose: true,
      data: {
        checkout: true,
      },
    });
  }
}
