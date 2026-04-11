import { Product } from './models/product-type';
import { CartItem } from './models/cart-type';
import {
  patchState,
  signalMethod,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { SAMPLE_PRODUCTS } from './models/sample-products';
import { computed, inject } from '@angular/core';
import { produce } from 'immer';
import { Toaster } from './services/toaster';
import { MatDialog } from '@angular/material/dialog';
import { SignInDialog } from './components/sign-in-dialog/sign-in-dialog';
import { SignInParams, SignUpParams, User } from './models/user-type';
import { Router } from '@angular/router';

export type EcommerceState = {
  products: Product[];
  category: string;
  wishListItems: Product[];
  cartItems: CartItem[];
  user: User | undefined;
};

export const EcommerceStore = signalStore(
  {
    providedIn: 'root',
  },
  withState({
    products: SAMPLE_PRODUCTS,
    category: 'all',
    wishListItems: [] as Product[],
    cartItems: [] as CartItem[],
    user: {} as User,
  }),
  withComputed(({ category, products, wishListItems, cartItems }) => ({
    filteredProducts: computed(() => {
      if (category() === 'all') return products();
      return products().filter((p) => p.category === category().toLowerCase());
    }),
    wishListCount: computed(() => wishListItems().length),
    cartItemsCount: computed(() => cartItems().reduce((acc, item) => acc + item.quantity, 0)),
  })),
  withMethods(
    (store, toaster = inject(Toaster), matDialog = inject(MatDialog), router = inject(Router)) => ({
      setCategory: signalMethod<string>((category) => {
        patchState(store, { category });
      }),
      addToWishList: (product: Product) => {
        const updatedWishListItems = produce(store.wishListItems(), (draft: Product[]) => {
          if (!draft.find((p) => p.id === product.id)) {
            draft.push(product);
          }
        });
        patchState(store, { wishListItems: updatedWishListItems });
        toaster.success('Product added to wishlist');
      },
      removeFromWishList: (product: Product) => {
        patchState(store, {
          wishListItems: store.wishListItems().filter((w) => w.id !== product.id),
        });
        toaster.success('Product removed to wishlist');
      },
      clearWishList: () => {
        patchState(store, { wishListItems: [] });
      },
      addToCart: (product: Product, quantity = 1) => {
        const existingItemIndex = store.cartItems().findIndex((c) => c.product.id === product.id);

        const updatedCartItems = produce(store.cartItems(), (draft: CartItem[]) => {
          if (existingItemIndex !== -1) {
            draft[existingItemIndex].quantity += quantity;
            return;
          }
          draft.push({
            product,
            quantity,
          });
        });

        patchState(store, { cartItems: updatedCartItems });
        toaster.success(existingItemIndex !== -1 ? 'Product added again' : 'Product added to cart');
      },
      setItemQuantity: (params: { productId: string; quantity: number }) => {
        const index = store.cartItems().findIndex((c) => c.product.id === params.productId);
        const updated = produce(store.cartItems(), (draft) => {
          draft[index].quantity = params.quantity;
        });
        patchState(store, { cartItems: updated });
      },
      addAllWishlistToCart: () => {
        const updatedCartItems = produce(store.cartItems(), (draft) => {
          store.wishListItems().forEach((p) => {
            if (!draft.find((c) => c.product.id === p.id)) {
              draft.push({
                product: p,
                quantity: 1,
              });
            }
          });
        });
        patchState(store, { cartItems: updatedCartItems, wishListItems: [] });
      },
      moveToWishlist: (product: Product) => {
        const updatedCartItems = store.cartItems().filter((c) => c.product.id !== product.id);
        const updatedWishlistItems = produce(store.wishListItems(), (draft) => {
          if (!draft.find((d) => d.id === product.id)) {
            draft.push(product);
          }
        });

        patchState(store, {
          cartItems: updatedCartItems,
          wishListItems: updatedWishlistItems,
        });
      },
      removeFromCart: (product: Product) => {
        patchState(store, {
          cartItems: store.cartItems().filter((c) => c.product.id !== product.id),
        });
      },
      proceedToCheckout: () => {
        matDialog.open(SignInDialog, {
          disableClose: true,
          data: {
            checkout: true,
          },
        });
      },
      signIn: ({ email, password, checkOut, dialogId }: SignInParams) => {
        patchState(store, {
          user: {
            id: '1',
            email: email,
            name: 'John Doe',
            imageUrl: 'https://randomuser.me/api/portraits/men/1.jpg',
          },
        });

        matDialog.getDialogById(dialogId)?.close();

        if (checkOut) {
          router.navigate(['/checkout']);
        }
      },

      signUp: ({ email, password, name, checkOut, dialogId }: SignUpParams) => {
        patchState(store, {
          user: {
            name: name,
            id: '1',
            email: email,
            imageUrl: 'https://randomuser.me/api/portraits/men/1.jpg',
          },
        });

        matDialog.getDialogById(dialogId)?.close();

        if (checkOut) {
          router.navigate(['/checkout']);
        }
      },
      signOut: () => {
        patchState(store, {
          user: {} as User,
        });
      },
    }),
  ),
);
