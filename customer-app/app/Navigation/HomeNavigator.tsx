import { createStackNavigator } from "@react-navigation/stack";
import React, { useState } from "react";
import {  Ionicons } from "@expo/vector-icons";
import routes from "./routes";
import AppText from "../components/AppText";
import defaultStyles from "../Config/styles";
import CartsScreen from "../Screens/CartsScreen";
import HomeScreen from "../Screens/HomeScreen";
import ItemDetailsScreen from '../Screens/ItemDetailsScreen';
import Item from "../Model/Item";
import { useEffect } from "react";

function HomeNavigator() {
  const [item, setItem] = useState(null);
  const HomeNavigator = createStackNavigator();



  return (
    <HomeNavigator.Navigator>
      <HomeNavigator.Screen
        name={routes.HOME_SCREEN}
        options={{ headerStyle: {
          backgroundColor: defaultStyles.Colors.grey100,
        },
        
        headerShadowVisible: false,
        headerShown: false,
         }}
      >
        {(props) => <HomeScreen {...props} setItem={setItem} />}
      </HomeNavigator.Screen>
      <HomeNavigator.Screen
        name={routes.ITEM_DETAILS_SCREEN}
        options={{ headerTitle: (item !== null)? item.name : "",headerBackImage(props) {
          return (
            <Ionicons
              name="arrow-back"
              size={24}
              color={defaultStyles.Colors.black}
              style={{ margin: 6 }}
            />
          );
        },
        
        headerBackTitleVisible: false }}
      >
        
        {(props) => <ItemDetailsScreen {...props} item={item} />}  
      </HomeNavigator.Screen>
      
    </HomeNavigator.Navigator>
  );
}

export default HomeNavigator;
