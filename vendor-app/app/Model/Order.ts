import Item from '../Model/Item'

interface Order {
  orderId: number;
  item: Item;
  noOfItems: number;
}

export default Order;
