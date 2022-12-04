import { StyleSheet, Text, View } from 'react-native';
import * as Fonts from "expo-font";

import { AppNavigator } from './app/Navigation/AppNavigator';
import { NavigationContainer } from "@react-navigation/native";
import { fontAssets } from './app/Config/styles';
import { useEffect } from 'react';
import AuthNavigator from './app/Navigation/AuthNavigator';


export default function App() {
  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        await Fonts.loadAsync(fontAssets);
        console.log('load');
        
      } catch (e) {
        console.warn(e);
      } 
    }

    prepare();
  }, []);
  return (
    <NavigationContainer>

      <AuthNavigator/>
    </NavigationContainer>
    // <View style={styles.container}>
    //   <Text>Open up App.tsx to start working on your app!!!</Text>
    //   <StatusBar style="auto" />
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
