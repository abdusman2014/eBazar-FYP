import create from "zustand";
import Address from "../Model/Address";
import Card from "../Model/Card";
import User from "../Model/User";

interface CardState {
  card: Card | null;
  setCard: (user: Card) => void;
  topUp: (amount: number) => void;
  transaction: (amount: number) => void;
  addTransaction: (data: {
    title: string;
    image: string | null;
    amount: number;
    isTopUp: boolean;
    date: Date;
  }[]) => void;
}

const userCardStore = create<CardState>()((set) => ({
  card: null,
  setCard: (card) =>
    set((state) => ({
      card: (state.card = card),
    })),
  topUp: (amount) =>
    set((state) => {
      return {
        card: {
          ...state.card,
          balance: state.card?.balance! + amount,
        } as Card,
      };
    }),
    transaction: (amount) =>
    set((state) => {
      return {
        card: {
          ...state.card,
          balance: state.card?.balance! - amount,
        } as Card,
      };
    }),
  addTransaction: (data) =>
    set((state) => {
      // const transaction = state.card?.transactionHistory;
      // transaction?.push(data);
      return {
        card: {
          ...state.card,
          transactionHistory: data,
        } as Card,
      };
    }),
}));

export default userCardStore;
