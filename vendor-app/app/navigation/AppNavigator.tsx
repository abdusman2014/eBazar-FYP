import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import routes from "./routes";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";

import { EvilIcons } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Image } from "react-native";

import defaultStyles from "../config/styles";

// import GeofencesNavigator from "./GeofencesNavigator";

import AuctionScreen from "../screen/Auction/AuctionScreen";
import OrdersScreen from "../screen/OrdersScreen";

const Tab = createBottomTabNavigator();

const getTabBarVisibility = (route) => {
  // Get current (focused) route name
  const routeName = getFocusedRouteNameFromRoute(route);
  if (
    routeName?.toLowerCase().includes(routes.AUCTION_SCREEN.toLocaleLowerCase())
  ) {
    // return false if VehicleSelectionScreen is focused
    return false;
  }
  return true;
};

export const AppNavigator = () => {
  return (
    <Tab.Navigator
      // tabBar={(props) => <ApptabBar {...props} />}
      tabBarOptions={{
        activeTintColor: defaultStyles.Colors.black,
        inactiveTintColor: defaultStyles.Colors.grey500,
        style: {
          borderTopColor: "#66666666",
          backgroundColor: defaultStyles.Colors.white,
          elevation: 10,
        },
      }}
    >
      <Tab.Screen
        name={routes.ORDERS_SCREEN}
        component={OrdersScreen}
        options={{
          // tabBarLabelStyle: {color: 'red'},
          //tabBarIconStyle: {color: 'red'},
          tabBarLabel: "Orders",

          tabBarIcon: ({ color, size }) => (
            <SimpleLineIcons name="handbag" size={size} color={color} />
          ),
          headerShown: false,
          headerTitle: "Your Orders",
        }}
      />
      <Tab.Screen
        name={routes.AUCTION_SCREEN}
        component={AuctionScreen}
        options={({ route }) => ({
          tabBarLabel: "Auction",
          headerShown: false,
          // dynamic display of tab navigator
          tabBarVisible: getTabBarVisibility(route),
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require("../assets/images/auction-icon.jpeg")}
              style={{
                width: 30,
                height: 30,
              }}
            />
          ),
        })}
      />
    </Tab.Navigator>
  );
};
