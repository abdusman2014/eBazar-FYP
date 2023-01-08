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
import AddAddressScreen from "../Screens/AddAddressScreen";
import OrdersScreen from "../Screens/OrdersScreen";
import TrackOrderScreen from "../Screens/TrackOrderScreen";




function TrackOrderNavigator() {
  const TrackOrderNavigator = createStackNavigator();

  return (
    <TrackOrderNavigator.Navigator >
      <TrackOrderNavigator.Screen
        name={routes.ORDER_SCREEN}
        options={{ headerStyle: {
          backgroundColor: defaultStyles.Colors.grey100,
        },
        headerShown: true,
        headerShadowVisible: false,
        //headerShown: true,
        headerTitle: 'Orders', }}
      >
        {(props) => <OrdersScreen {...props} />}
      </TrackOrderNavigator.Screen>
      <TrackOrderNavigator.Screen
        name={routes.TRACK_ORDER_SCREEN}
        options={{ headerTitle: 'Track Your Order',headerBackImage(props) {
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
        {(props) => <TrackOrderScreen {...props} />}
      </TrackOrderNavigator.Screen>
      
    </TrackOrderNavigator.Navigator>
  );
}

export default TrackOrderNavigator;
