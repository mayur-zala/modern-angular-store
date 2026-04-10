import { Product } from './models/product-type';
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

export type EcommerceState = {
  products: Product[];
  category: string;
  wishListItems: Product[];
};

export const EcommerceStore = signalStore(
  {
    providedIn: 'root',
  },
  withState({
    products: SAMPLE_PRODUCTS,
    category: 'all',
    wishListItems: [] as Product[],
  }),
  withComputed(({ category, products, wishListItems }) => ({
    filteredProducts: computed(() => {
      if (category() === 'all') return products();
      return products().filter((p) => p.category === category().toLowerCase());
    }),
    wishListCount: computed(() => wishListItems().length),
  })),
  withMethods((store, toaster = inject(Toaster)) => ({
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
  })),
);
