import create from "zustand";
import User from "../Model/User";

interface UserState {
  user: User | null;
  setUser: (user: User) => void;
}

const userStore = create<UserState>()((set) => ({
  user: null,
  setUser: (user) =>
    set((state) => ({
      user: (state.user = user),
    })),
}));

export default userStore;
