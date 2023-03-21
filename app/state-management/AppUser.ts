import create from "zustand";
import Address from "../Model/Address";
import User from "../Model/User";

interface UserState {
  // user: User | null;
  // setUser: (user: User) => void;
  addOrder: (order: string) => void;
  addAddressToUser: (address: Address) => void;
}

const userStore = create<UserState>()((set) => ({
  // user: null,
  // setUser: (user) =>
  //   set((state) => ({
  //     user: (state.user = user),
  //   })),
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
}));

export default userStore;
