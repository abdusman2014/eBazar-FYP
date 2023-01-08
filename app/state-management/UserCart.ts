import create from "zustand";
import { devtools, persist, StateStorage } from "zustand/middleware";

import Order from "../Model/Order";
import Item from "../Model/Item";

interface CartState {
  cartItems: Order[];
  setCartItems: (orders: Order[]) => void;
  addCartItem: (item: Item) => void;
  removeItemFromCart: (orderId: number) => void;
  incrementItemCount: (orderId: number) => void;
  decrementItemCount: (orderId: number) => void;
}

const getNoOfItemsOfAnOrder = (orders: Order[], item: Item) => {
  //returns index of order having same itemId
  //else return -1
  const itemIndex = orders.findIndex(
    (elemet: Order) => elemet.item.item_id === item.item_id
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

const useCartStore = create<CartState>()((set) => ({
  cartItems: [],
  setCartItems: (orders) =>
  set((state) => ({
    cartItems: (state.cartItems = orders)
  })),
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
  removeItemFromCart: (orderid) => {
    set((state) => {
      return {
        cartItems: state.cartItems.filter(
          (element) => element.orderId !== orderid
        ),
      };
    });
  },
  incrementItemCount: (orderId) => {
    set((state) => {
      return {
        cartItems: state.cartItems.map((element: Order) =>
          element.orderId === orderId
            ? ({
                ...element,
                noOfItems: element.noOfItems + 1,
              } as Order)
            : element
        ),
      };
    });
  },
  decrementItemCount: (orderId) => {
    set((state) => {
      return {
        cartItems: state.cartItems.map((element: Order) =>
          element.orderId === orderId
            ? ({
                ...element,
                noOfItems: element.noOfItems - 1,
              } as Order)
            : element
        ),
      };
    });
  },
 
}));

export default useCartStore;
