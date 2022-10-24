import create from "zustand";
import { devtools, persist, StateStorage } from "zustand/middleware";

//source: https://github.com/pmndrs/zustand/blob/main/docs/integrations/persisting-store-data.md#how-can-i-use-a-custom-storage-engine
import { get, set, del } from "idb-keyval"; // can use anything: IndexedDB, Ionic Storage, etc.

import Order from "../Model/Order";
import Item from "../Model/Item";

interface CartState {
  cartItems: Order[];
  addCartItem: (item: Item) => void;
}

// Custom storage object
const storage: StateStorage = {
  getItem: async (name: string): Promise<string | null> => {
    console.log(name, "has been retrieved");
    return (await get(name)) || null;
  },
  setItem: async (name: string, value: string): Promise<void> => {
    console.log(name, "with value", value, "has been saved");
    await set(name, value);
  },
  removeItem: async (name: string): Promise<void> => {
    console.log(name, "has been deleted");
    await del(name);
  },
};

const getNoOfItemsOfAnOrder = (orders: Order[], item: Item) => {
  //returns index of order having same itemId
  //else return -1
  const itemIndex = orders.findIndex(
    (elemet: Order) => elemet.item.itemId === item.itemId
  );
  if (itemIndex === -1) {
    return {
      index: orders.length,
      noOfItems: 1,
    };
  } else {
    return {
      index: itemIndex,
      noOfItems: orders[itemIndex].noOfItems,
    };
  }
};

const useCartStore = create<CartState>()(
  devtools(
    persist(
      (set) => ({
        cartItems: [],
        addCartItem: (item) => {
          set((state) => {
            const result = getNoOfItemsOfAnOrder(state.cartItems, item);
            if (result.index === state.cartItems.length) {
              return {
                cartItems: [
                  ...state.cartItems,
                  {
                    orderId: state.cartItems.length,
                    item: item,
                    noOfItems: result.noOfItems,
                  } as Order,
                ],
              };
            } else {
              const order = state.cartItems[result.index];
              return {
                cartItems: state.cartItems.map((element: Order) =>
                  element.orderId === order.orderId
                    ? ({
                        ...element,
                        noOfItems: element.noOfItems + 1,
                      } as Order)
                    : element
                ),
              };
            }
          });
        },
      }),
      {
        name: "cart-storage",
        getStorage: () => storage,
      }
    )
  )
);

export default useCartStore;
