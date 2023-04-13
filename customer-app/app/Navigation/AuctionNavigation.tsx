import { createStackNavigator } from "@react-navigation/stack";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import routes from "./routes";
import AppText from "../components/AppText";
import defaultStyles from "../Config/styles";
import CartsScreen from "../Screens/CartsScreen";
import HomeScreen from "../Screens/HomeScreen";
import ItemDetailsScreen from "../Screens/ItemDetailsScreen";
import Item from "../Model/Item";
import { useEffect } from "react";
import SignInScreen from "../Screens/Auth/SignInScreen";
import OtpScreen from "../Screens/Auth/OtpScreen";
import { AppNavigator } from "./AppNavigator";
import UserProfileInputScreen from "../Screens/Auth/UserProfileInputScreen";
import AuctionScreen from "../Screens/Auction/AuctionScreen";
import AddAutionProductScreen from "../Screens/Auction/AddAutionProductScreen";

function AuctionNavigator() {

  const AuctionNavigator = createStackNavigator();

  return (
    <AuctionNavigator.Navigator  screenOptions={{
      headerShown: false
    }}>
      <AuctionNavigator.Screen
        name={routes.AUCTION_SCREEN}
        options={{
          headerStyle: {
            backgroundColor: defaultStyles.Colors.grey100,
          },

          headerShadowVisible: false,
          headerShown: false,
        }}
      >
        {(props) => (
          <AuctionScreen {...props}></AuctionScreen>
        )}
      </AuctionNavigator.Screen>
     
      <AuctionNavigator.Screen
        name={routes.AUCTION_ADD_PRODUCT_SCREEN}
        options={{
          headerStyle: {
            backgroundColor: defaultStyles.Colors.grey100,
          },

          headerShadowVisible: false,
          headerShown: false,
        }}
      >
        {(props) => (
          <AddAutionProductScreen {...props}></AddAutionProductScreen>
        )}
      </AuctionNavigator.Screen>
      
    </AuctionNavigator.Navigator>
  );
}

export default AuctionNavigator;
