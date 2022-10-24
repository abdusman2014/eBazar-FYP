import React from "react";
import { SafeAreaView, View, StyleSheet } from "react-native";


import AppText from "../Components/AppText";
import CartItemComponent from "../Components/CartItemComponent";
import defaultStyles from "../Config/styles";
import useCartStore from '../state-management/UserCart'


function CartsScreen(props) {
  const {
    cartItems
} = useCartStore();
  return <SafeAreaView style={styles.container}>
    <CartItemComponent order={cartItems[0]}/>
  </SafeAreaView>;
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    //top: 12,
   
    flex: 1,
    backgroundColor: defaultStyles.Colors.primaeryGrey,
    
  },
});

export default CartsScreen;
