import React from "react";
import { StyleSheet, Text, View } from "react-native";
import * as Fonts from "expo-font";
import Lottie from "lottie-react-native";

import { AppNavigator } from "./app/Navigation/AppNavigator";
import { NavigationContainer } from "@react-navigation/native";
import { fontAssets } from "./app/Config/styles";
import { useEffect, useState } from "react";
import AuthNavigator from "./app/Navigation/AuthNavigator";
import UserProfileComponent from "./app/Components/UserProfileComponent";
import UserProfileInputScreen from "./app/Screens/Auth/UserProfileInputScreen";
import firebase from "./firebase";
import OrdersScreen from "./app/Screens/OrdersScreen";
import TrackOrderScreen from "./app/Screens/TrackOrderScreen";
import userStore from "./app/state-management/AppUser";
//useless commtn
export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const {user} = userStore();
  //console.log('::',isLoggedIn);
  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        await Fonts.loadAsync(fontAssets);
        console.log("load");
        

        setIsLoading(false);
      } catch (e) {
        console.warn(e);
      }
    }

    prepare();
  }, []);
  if (isLoading) {
    return (
      <View style={{flex:1, alignItems: "center", justifyContent: "center" }}>
        <View style={{ height: 100 }} />
        <Lottie
          source={require("./app/assets/progress.json")}
          autoPlay
          loop
         // style={{ height: 600, width: 600 }}
        />
      </View>
    );
  }
  return (
     <NavigationContainer>
     {user? <AppNavigator/> : <AuthNavigator />}
    </NavigationContainer> 
    //<OrdersScreen></OrdersScreen>
    // <TrackOrderScreen></TrackOrderScreen>
    //  <UserProfileInputScreen/>
    // <View style={styles.container}>
    //   <Text>Open up App.tsx to start working on your app!!!</Text>
    //   <StatusBar style="auto" />
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
