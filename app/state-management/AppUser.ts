import create from "zustand";
import User from "../Model/User";

interface UserState {
  user: User | null;
  setUser: (user: User) => void;
  addOrder: (order: string) => void;
}

const userStore = create<UserState>()((set) => ({
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
      user: ({
        ...state.user,
        orders:  orders,
      } as User)
    }}),

}));

export default userStore;
