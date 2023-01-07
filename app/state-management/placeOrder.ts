import create from "zustand";
import { devtools, persist, StateStorage } from "zustand/middleware";

import Order from "../Model/Order";
import Item from "../Model/Item";
import Address from "../Model/Address";

import PaymentStatus from "../Model/PaymentStatus";
import PaymentType from "../Model/PaymentType";

interface PaymentState {
  totalPrice: number|null;
  address: Address | null;
  paymentType: PaymentType;
  paymentStatus: PaymentStatus;
  userDetails: {name:string,phoneNo: string} | null;
  cart: Order[] | null;
  addTotalPrice: (price: number) => void;
  addUserDetails: (userDetails: {name:string,phoneNo: string}) => void;
  addAddress: (address: Address) => void;
  addCart: (cart: Order[]) => void;
  updatePaymentType: (paymentType: PaymentType) => void;
  updatePaymentStatus: (paymentStatus: PaymentStatus) => void;
}

const usePlaceOrderStore = create<PaymentState>()((set) => ({
  totalPrice: null,
  cart: null,
  userDetails: null,
  address: null,
  paymentType: PaymentType.NOT_SET,
  paymentStatus: PaymentStatus.NOT_SET,
  addAddress: (address) => {
    set((state) => {
      return {
        address: address,
      };
    });
  },
  addTotalPrice: (price) => {
    set((state) => {
      return {
        totalPrice: price,
      };
    });
  },
  addCart: (cart) => {
    set((state) => {
      return {
        cart: cart,
      };
    });
  },
  addUserDetails: (userDetails) => {
    set((state) => {
      return {
        userDetails: userDetails,
      };
    });
  },
  updatePaymentStatus: (paymentStatus) => {
    set((state) => {
      return {
        paymentStatus: paymentStatus,
      };
    });
  },
  updatePaymentType: (paymentType) => {
    set((state) => {
      return {
        paymentType: paymentType,
      };
    });
  },
}));

export default usePlaceOrderStore;
