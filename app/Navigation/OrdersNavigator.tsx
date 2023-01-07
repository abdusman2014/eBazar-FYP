import { createStackNavigator } from "@react-navigation/stack";
import React, { useState } from "react";
import {  Ionicons } from "@expo/vector-icons";

import routes from "./routes";
import AppText from "../components/AppText";
import defaultStyles from "../Config/styles";
import CheckoutScreen from "../Screens/CheckoutScreen";
import CartsScreen from "../Screens/CartsScreen";
import AddressScreen from "../Screens/AddressScreen";
import PaymentScreen from "../Screens/PaymentScreen";
import {
  createMaterialTopTabNavigator,
  createAppContainer
} from "react-navigation";


function OrdersNavigator() {
  const OrdersNavigator = createStackNavigator();
/*   const SwipeTabs = createMaterialTopTabNavigator(
    {
      screen1: { screen: ActiveOrders},
      screen2: { screen: CompletedOrders},
    },
    {
      initialRouteName: "screen1",
      animationEnabled: true,
      tabBarOptions: {
        showLabel: false,
        showIcon: false,
        style: { height: 0 }
      }
    }
  );
   */
  return (
    <OrdersNavigator.Navigator>
      <OrdersNavigator.Screen
        name={routes.CART_SCREEN}
        options={{ headerStyle: {
          backgroundColor: defaultStyles.Colors.grey100,
        },
        
        headerShadowVisible: false,
        //headerShown: true,
        headerTitle: 'My Cart', }}
      >
        {(props) => <CartsScreen {...props} />}
      </OrdersNavigator.Screen>
      <OrdersNavigator.Screen
        name={routes.CHECKOUT_SCREEN}
        options={{ headerTitle: 'Checkout',headerBackImage(props) {
          return (
            <Ionicons
              name="arrow-back"
              size={24}
              color={defaultStyles.Colors.black}
              style={{ margin: 12 }}
            />
          );
        },
        
        headerBackTitleVisible: false }}
      >
        {(props) => <CheckoutScreen {...props} />}
      </OrdersNavigator.Screen>
      <OrdersNavigator.Screen
        name={routes.ADDRESS_SCREEN}
        options={{ headerTitle: 'Shipping Address',headerBackImage(props) {
          return (
            <Ionicons
              name="arrow-back"
              size={24}
              color={defaultStyles.Colors.black}
              style={{ margin: 12 }}
            />
          );
        },
        
        headerBackTitleVisible: false }}
      >
        {(props) => <AddressScreen {...props} />}
      </OrdersNavigator.Screen>
      <OrdersNavigator.Screen
        name={routes.PAYMENT_SCREEN}
        options={{ headerTitle: 'Payment Method',headerBackImage(props) {
          return (
            <Ionicons
              name="arrow-back"
              size={24}
              color={defaultStyles.Colors.black}
              style={{ margin: 12 }}
            />
          );
        },
        
        headerBackTitleVisible: false }}
      >
        {(props) => <PaymentScreen {...props} />}
      </OrdersNavigator.Screen>
    </OrdersNavigator.Navigator>
  );
}

export default OrdersNavigator;
