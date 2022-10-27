import create from "zustand";
import { devtools, persist, StateStorage } from "zustand/middleware";

import Order from "../Model/Order";
import Item from "../Model/Item";
import Address from "../Model/Address";

import PaymentStatus from "../Model/PaymentStatus";
import PaymentType from "../Model/PaymentType";

interface PaymentState {
  address: Address | null;
  paymentType: PaymentType;
  paymentStatus: PaymentStatus;
  addAddress: (address: Address) => void;
  updatePaymentType: (paymentType: PaymentType) => void;
  updatePaymentStatus: (paymentStatus: PaymentStatus) => void;
}

const usePlaceOrderStore = create<PaymentState>()((set) => ({
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
