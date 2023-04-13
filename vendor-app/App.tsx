import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import * as Fonts from "expo-font";
import AuctionScreen from "./app/screen/Auction/AuctionScreen";
import { fontAssets } from "./app/config/styles";
import { NavigationContainer } from "@react-navigation/native";
import { AppNavigator } from "./app/navigation/AppNavigator";
export default function App() {
  const [isLoading, setIsLoading] = useState(true);
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
if(isLoading){
  return;
}
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
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
