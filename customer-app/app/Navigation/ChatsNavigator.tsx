import { createStackNavigator } from "@react-navigation/stack";
import React, { useState } from "react";
import {  Ionicons } from "@expo/vector-icons";

import routes from "./routes";
import AppText from "../components/AppText";
import defaultStyles from "../Config/styles";
import MessagesScreen from "../Screens/MessagesScreen";
import userStore from "../state-management/AppUser";
import ChatScreen from "../Screens/ChatScreen";


function ChatsNavigator() {

  const { user } = userStore();
  const ChatsNavigator = createStackNavigator();

  return (
    <ChatsNavigator.Navigator >
      <ChatsNavigator.Screen
        name={routes.MESSAGES_SCREEN}
        options={{ headerStyle: {
          backgroundColor: defaultStyles.Colors.grey100,
        },
        headerShown: true,
        headerShadowVisible: false,
        //headerShown: true,
        headerTitle: 'Your Chats', }}
      >
        {(props) => <MessagesScreen user={user} navigation={ChatScreen} />}
      </ChatsNavigator.Screen>
    </ChatsNavigator.Navigator>
  );
}

export default ChatsNavigator;
