import React from "react";
import {
  View,
  Image,
  Pressable,
  Alert,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import AppText from "../Components/AppText";
import OrderItemComponent from "../Components/OrderItemComponent";
import useCartStore from "../state-management/UserCart";
import { FlatList } from "react-native-gesture-handler";

import defaultStyles from "../Config/styles";
import Item from "../Model/Item";
import DeliveryStatus from "../Model/DeliveryStatus";
import PaymentStatus from "../Model/PaymentStatus";
import PaymentType from "../Model/PaymentType";
import App from "../../App";
import { StatusBar } from "expo-status-bar";
import ActiveOrders from "../Components/ActiveOrders";
import CompletedOrders from "../Components/CompletedOrders";
import Order from "../Model/Order";
import routes from "../Navigation/routes";

const order1 = [
  {
    address: {
      addressId: 0,
      description: "house no. 2003, street22",
      isSelected: true,
      title: "home",
    },
    cart: [
      {
        category_id: "UxjQzr0g8Fa2p3ZkVzSr",
        color: "brown",
        description: "Can store up to 25 items",
        image:
          "https://firebasestorage.googleapis.com/v0/b/e-bazar-1c970.appspot.com/o/Items%2FBrown%20Cupboard.png?alt=media&token=f8349bbe-967d-4780-8596-89c7c8291670",
        item_id: "7QnDO0DqaGzPwZPGWZCQ",
        name: "Cupboard",
        price: 8000,
        rating: 4.4,
        soldCount: 100,
        noOfItems: 2,
        orderId: 0,
      },
      {
        category_id: "KMaXSFuZteI2G6WRDy8P",
        color: "Black",
        description: "Imported Black Boots for all fashions",
        image:
          "https://firebasestorage.googleapis.com/v0/b/e-bazar-1c970.appspot.com/o/Items%2FBlack%20Boots.png?alt=media&token=9fc7a397-0515-4f7a-b732-34baacb006c7",
        item_id: "7yciEIV56pRTotWAUIwn",
        name: "Boots",
        price: 4500,
        rating: 4.9,
        soldCount: 134,
        noOfItems: 1,
        orderId: 1,
      },
    ],
    deliveryStatus: DeliveryStatus.delivered,
    orderId: "jITo3lf0NTiEQsol0jJi",
    paymentStatus: PaymentStatus.PAID,
    paymentType: PaymentType.CARD,
    totalPrice: 3200,
    userDetails: {
      name: "Usama Khatab",
      phoneNo: "+923458522383",
    },
  },
  {
    address: {
      addressId: 0,
      description: "house no. 2003, street22",
      isSelected: true,
      title: "home",
    },
    cart: [
      {
        category_id: "UxjQzr0g8Fa2p3ZkVzSr",
        color: "brown",
        description: "Can store up to 25 items",
        image:
          "https://firebasestorage.googleapis.com/v0/b/e-bazar-1c970.appspot.com/o/Items%2FBrown%20Cupboard.png?alt=media&token=f8349bbe-967d-4780-8596-89c7c8291670",
        item_id: "7QnDO0DqaGzPwZPGWZCQ",
        name: "Cupboard",
        price: 8000,
        rating: 4.4,
        soldCount: 100,
        noOfItems: 2,
        orderId: 0,
      },
      {
        category_id: "KMaXSFuZteI2G6WRDy8P",
        color: "Black",
        description: "Imported Black Boots for all fashions",
        image:
          "https://firebasestorage.googleapis.com/v0/b/e-bazar-1c970.appspot.com/o/Items%2FBlack%20Boots.png?alt=media&token=9fc7a397-0515-4f7a-b732-34baacb006c7",
        item_id: "7yciEIV56pRTotWAUIwn",
        name: "Boots",
        price: 4500,
        rating: 4.9,
        soldCount: 134,
        noOfItems: 1,
        orderId: 1,
      },
    ],
    deliveryStatus: DeliveryStatus.inTransit,
    orderId: "jITo3lf0NTiEQsol0jJi",
    paymentStatus: PaymentStatus.PAID,
    paymentType: PaymentType.CARD,
    totalPrice: 3200,
    userDetails: {
      name: "Usama Khatab",
      phoneNo: "+923458522383",
    },
  },
];

function OrdersScreen(props) {
  const { cartItems } = useCartStore();
  const layout = useWindowDimensions();
  const [isActive, setIsActive] = React.useState(true);
  const [index, setIndex] = React.useState(0);
  const [active, setActive] = React.useState();
  const [completed, setCompleted] = React.useState(null);

  //
  React.useEffect(() => {
    const b = order1.filter(
      (item) => item.deliveryStatus === DeliveryStatus.delivered
    );
    setCompleted(b);
    const a = order1.filter(
      (item) => item.deliveryStatus !== DeliveryStatus.delivered
    );
    setActive(a);
  }, []);

  /*   if (cartItems.length === 0) {
    return (
      <View style={{
        padding: 5,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}>
        <Image source={require("../assets/images/orders-empty.png")}
        style={{
          width: 350,
          height: 350,
          resizeMode: "cover",
        }}/>
        <AppText style={defaultStyles.typography.h3}> You dont have an order yet</AppText>
      </View>
    );
  } else */
  return (
    /* <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}'
          initialLayout={{ width: layout.width }}
          navigation
          style={styles.TabBar}
    >
    
    </TabView> */

    <View style={{ backgroundColor:'white',flex: 1 }}>
      <View style={{ flexDirection: "row", paddingVertical: 8 }}>
        <Pressable
          style={{ width: "50%" }}
          onPress={() => setIsActive(!isActive)}
        >
          <AppText
            style={[
              defaultStyles.typography.h3,
              { textAlign: "center", color: isActive ? "black" : "gray" },
            ]}
          >
            Active
          </AppText>
          <View
            style={{
              width: "100%",
              height: 4,
              backgroundColor: isActive ? "black" : "gray",
            }}
          ></View>
        </Pressable>
        <Pressable
          style={{ width: "50%" }}
          onPress={() => setIsActive(!isActive)}
        >
          <AppText
            style={[
              defaultStyles.typography.h3,
              { textAlign: "center", color: !isActive ? "black" : "gray" },
            ]}
          >
            Completed
          </AppText>
          <View
            style={{
              width: "100%",
              height: 4,
              backgroundColor: !isActive ? "black" : "gray",
            }}
          ></View>
        </Pressable>
      </View>

      {active && completed && isActive ? (
        <ActiveOrders
          Order={active}
          props={props}
        ></ActiveOrders>
      ) : (
        <CompletedOrders Order={completed} props={props}></CompletedOrders>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBar: {
    flexDirection: "row",
    paddingTop: 50,
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    padding: 16,
  },
});
export default OrdersScreen;
