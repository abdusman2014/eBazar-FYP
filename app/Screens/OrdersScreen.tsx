import React from "react";
import { View, Image } from "react-native";
import AppText from "../Components/AppText";
import OrderItemComponent from "../Components/OrderItemComponent";
import useCartStore from "../state-management/UserCart";
import { FlatList } from "react-native-gesture-handler";

import defaultStyles from "../Config/styles";

function OrdersScreen(props) {

  const { cartItems } = useCartStore();

  if (cartItems.length === 0) {
    return (
      <View style={{
        padding: 5,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}>
        <Image source={require("../assets/images/orders-empty.png")}
        style={{
          width: 350,
          height: 350,
          resizeMode: "cover",
        }}/>
        <AppText style={defaultStyles.typography.h3}> You dont have an order yet</AppText>
      </View>
    );
  } else {
  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      <AppText> Orders Screen</AppText>
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 20,
        }}
        data={cartItems}
        style={{ padding: 16 }}
        keyExtractor={(item, index) => item.orderId.toString()}
        renderItem={(item) => (
          <OrderItemComponent order={item.item} isFromCartScreen={true} />
        )}
      />
    </View>
    
  );
        }
}

export default OrdersScreen;
