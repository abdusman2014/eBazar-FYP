import { StyleSheet, Text, View, Image, Pressable, FlatList, SafeAreaView } from 'react-native'
import React from 'react'
import Order from '../Model/Order';
import AppSpaceComponent from './AppSpaceComponent';
import AppText from './AppText';
import defaultStyles from "../Config/styles";
import CartItemComponent from './CartItemComponent';
import OrderItemComponent from './OrderItemComponent';
import DeliveryStatus from '../Model/DeliveryStatus';

const ActiveOrders = ({Order}) => {

  //console.log(Order)
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        
        data={Order}
        keyExtractor={(cart, index) => cart.orderId.toString()}
        renderItem={(cart) => {
          console.log(cart.item.cart)
          return <OrderItemComponent item={cart.item.cart[0]} status={cart.item.deliveryStatus} />
        }}
      />
      
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "95%",
    backgroundColor: defaultStyles.Colors.white,
    
    borderRadius: 20,
    padding: 8,
    margin: 8,

    //width: Dimensions.get("window").width - 20,
  },
  imageContainer: {
    backgroundColor: defaultStyles.Colors.primaeryGrey,
    padding: 16,
    borderRadius: 10,
    marginRight: 12,
    // alignSelf: "center",
    // width: "50%",
  },
  text: {
    width: 100,
    flexGrow: 1,
    flex: 1,
  },
});




export default ActiveOrders

