import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import routes from "./routes";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { Entypo } from '@expo/vector-icons';
import HomeScreen from "../Screens/HomeScreen";
import CartsScreen from "../Screens/CartsScreen";
import OrdersScreen from "../Screens/OrdersScreen";
import { EvilIcons } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { Feather } from '@expo/vector-icons';


import defaultStyles from "../Config/styles";
import OrdersNavigator from "./OrdersNavigator";

// import GeofencesNavigator from "./GeofencesNavigator";
import HomeNavigator from './HomeNavigator';
import WalletNavigator from "./WalletNavigator";
import TrackOrderNavigator from "./TrackOrdernavigator";

const Tab = createBottomTabNavigator();

const getTabBarVisibility = (route) => {
  // Get current (focused) route name
  const routeName = getFocusedRouteNameFromRoute(route);
  if (
    routeName?.toLowerCase().includes(routes.HOME_SCREEN.toLocaleLowerCase())
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
        name={routes.HOME_NAVIGATOR}
        component={HomeNavigator}
        options={({ route }) => ({
          tabBarLabel: "Home",
          headerShown: false,
          // dynamic display of tab navigator
          tabBarVisible: getTabBarVisibility(route),
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        })}
      />
      <Tab.Screen
        name={routes.CART_NAVIGATOR}
        component={OrdersNavigator}
        options={{
          headerShown:false,
          tabBarLabel: "Cart",
          tabBarIcon: ({ color, size }) => (
            <EvilIcons name="cart" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name={routes.WALLET_NAVIGATION}
        component={WalletNavigator}
        options={{
          headerShown:false,
          tabBarLabel: "Wallet",
          tabBarIcon: ({ color, size }) => (
            <Entypo name="wallet" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name={routes.ORDER_NAVIGATION}
        component={TrackOrderNavigator}
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
     
    </Tab.Navigator>
  );
};
