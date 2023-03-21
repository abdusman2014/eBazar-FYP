import create from "zustand";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Address from "../Model/Address";
import User from "../Model/User";
import { persist,createJSONStorage } from "zustand/middleware"
interface UserState {
  user: User | null;
  setUser: (user: User | null) => void;
  addOrder: (order: string) => void;
  addAddressToUser: (address: Address) => void;
}

const userStore = create<UserState>()(
  persist((set) => ({
    user: null,
    setUser: (user) =>
      set((state) => ({
        user: (state.user = user),
      })),
    addOrder: (order) =>
      set((state) => {
        const orders = state.user?.orders;
        orders?.push(order);
        return {
          user: {
            ...state.user,
            orders: orders,
          } as User,
        };
      }),
    addAddressToUser: (address) =>
      set((state) => {
        const addresses = state.user?.addresses;
        addresses?.push(address);
        return {
          user: {
            ...state.user,
            addresses: addresses,
          } as User,
        };
      }),
  }),{
    name: "user-storage",
    storage: createJSONStorage(() => AsyncStorage),  // Add this here!
  })
);

export default userStore;
