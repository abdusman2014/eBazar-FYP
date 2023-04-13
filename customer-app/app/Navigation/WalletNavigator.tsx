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
import WalletScreen from "../Screens/Wallet/WalletScreen";
import TopUPScreen from "../Screens/Wallet/TopUPScreen";

function WalletNavigator() {
  const WalletNavigator = createStackNavigator();
  return (
    <WalletNavigator.Navigator >
      <WalletNavigator.Screen
        name={routes.WALLET_SCREEN}
        options={{ headerStyle: {
          backgroundColor: defaultStyles.Colors.grey100,
        },
        headerShown: true,
        headerShadowVisible: false,
        //headerShown: true,
        headerTitle: 'My E-Wallet', }}
      >
        {(props) => <WalletScreen {...props} />}
      </WalletNavigator.Screen>
      <WalletNavigator.Screen
        name={routes.TOPUP_SCREEN}
        options={{ headerTitle: 'TopUp E-Wallet',headerBackImage(props) {
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
        {(props) => <TopUPScreen {...props} />}
      </WalletNavigator.Screen>
      {/* <WalletNavigator.Screen
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
      </WalletNavigator.Screen>
      <WalletNavigator.Screen
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
      </WalletNavigator.Screen>
      <WalletNavigator.Screen
        name={routes.ADD_ADDRESS_SCREEN}
        options={{ headerTitle: 'Add New Address',headerBackImage(props) {
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
        {(props) => <AddAddressScreen {...props} />}
      </WalletNavigator.Screen>
      <WalletNavigator.Screen
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
      </WalletNavigator.Screen> */}
    </WalletNavigator.Navigator>
  );
}

export default WalletNavigator;
