import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import routes from "./routes";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import HomeScreen from "../Screens/HomeScreen";
import CartsScreen from "../Screens/CartsScreen";
import OrdersScreen from "../Screens/OrdersScreen";
import { EvilIcons } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { Feather } from '@expo/vector-icons';


import defaultStyles from "../Config/styles";

// import GeofencesNavigator from "./GeofencesNavigator";

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
        name={routes.HOME_SCREEN}
        component={HomeScreen}
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
        name={routes.CART_SCREEN}
        component={CartsScreen}
        options={{
          headerStyle: {
            backgroundColor: defaultStyles.Colors.grey100,
          },
          
          headerShadowVisible: false,
          headerShown: true,
          headerTitle: 'My Cart',
          tabBarLabel: "Cart",
          tabBarIcon: ({ color, size }) => (
            <EvilIcons name="cart" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name={routes.ORDER_SCREEN}
        component={OrdersScreen}
        options={{
          // tabBarLabelStyle: {color: 'red'},
          //tabBarIconStyle: {color: 'red'},
          tabBarLabel: "Orders",

          tabBarIcon: ({ color, size }) => (
            <SimpleLineIcons name="handbag" size={size} color={color} />
          ),
          // headerShown: true,
          headerTitle: "Fleets",
        }}
      />
      {/* <Tab.Screen
        name={routes.GEOFENCES}
        component={GeofencesNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="mapbox" color={color} size={size} />
          )
        }}
      /> */}
      {/* <Tab.Screen
        name={routes.PROFILE}
        component={AccountScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
          headerShown: true,
        }}
      /> */}
    </Tab.Navigator>
  );
};
