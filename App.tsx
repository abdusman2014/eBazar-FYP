import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { AppNavigator } from './Navigation/AppNavigator';
import HomeScreen from './Screens/HomeScreen';
import { NavigationContainer } from "@react-navigation/native";


export default function App() {
  return (
    <NavigationContainer>

      <AppNavigator/>
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
