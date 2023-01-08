import { StyleSheet, Text, View, Image, Pressable, FlatList, SafeAreaView } from 'react-native'
import React from 'react'
import Order from '../Model/Order';
import AppSpaceComponent from './AppSpaceComponent';
import AppText from './AppText';
import defaultStyles from "../Config/styles";
import CartItemComponent from './CartItemComponent';
import OrderItemComponent from './OrderItemComponent';
import DeliveryStatus from '../Model/DeliveryStatus';
import AppButtonWithShadow from './AppButtonWithShadow';

const ActiveOrders = ({Order}) => {

  
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        
        data={Order}
        keyExtractor={(cart, index) => cart.orderId.toString()}
        renderItem={(cart) => {
          return <OrderItemComponent item={cart.item.cart[0]} status={cart.item.deliveryStatus} />
        }}
      />
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: defaultStyles.Colors.white,
    
    borderRadius: 15,
    padding: 4,
    margin: 4,

    //width: Dimensions.get("window").width - 20,
  },
  text: {
    width: 100,
    flexGrow: 1,
    flex: 1,
  },
  
});

export default ActiveOrders

