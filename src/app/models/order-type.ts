import { CartItem } from './cart-type';

export type DeliveryInfo = {
  name: string;
  email: string;
  phone: string;
  addressLine: string;
  city: string;
  state: string;
  zipCode: string;
  paymentMethod: string;
};

export type Order = {
  orderId: string;
  items: CartItem[];
  subTotal: number;
  tax: number;
  total: number;
  deliveryInfo: DeliveryInfo;
};
