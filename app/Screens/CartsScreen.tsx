import React from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  Dimensions,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import AppButtonWithShadow from "../Components/AppButtonWithShadow";

import AppText from "../Components/AppText";
import CartItemComponent from "../Components/CartItemComponent";
import defaultStyles from "../Config/styles";
import useCartStore from "../state-management/UserCart";
import AppSpaceComponent from "../Components/AppSpaceComponent";
import routes from "../Navigation/routes";

function CartsScreen(props) {
  const { cartItems } = useCartStore();
  console.log(Dimensions.get("window").height);

  const getTotalPriceOFCart = () => {
    let sum = 0;
    cartItems.forEach((order) => {
      sum += order.noOfItems * order.item.price;
    });
    return sum;
  };
  const handleCheckoutButtonPress = ()=>{
    props.navigation.navigate(routes.CHECKOUT_SCREEN);
  };

  if (cartItems.length === 0) {
    return (
      <View
        style={{
          position: "absolute",
          left: Dimensions.get("window").width / 3,
          bottom: Dimensions.get("window").height / 2,
        }}
      >
        <AppText style={defaultStyles.typography.h1}>No Item</AppText>
        <AppText style={[defaultStyles.typography.h1, { textAlign: "center" }]}>
          In Cart
        </AppText>
      </View>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        contentContainerStyle={{
          paddingBottom: 20,
        }}
        data={cartItems}
        style={{ padding: 16 }}
        keyExtractor={(item, index) => item.orderId.toString()}
        renderItem={(item) => <CartItemComponent order={item.item} />}
      />

      <View style={styles.bottomCheckOutComponent}>
        <View>
          <AppText style={{ fontSize: 18, opacity: 0.6 }}>Total Price</AppText>
          <AppText
            style={[defaultStyles.typography.h2, { fontWeight: "bold" }]}
          >
            {"$"} {getTotalPriceOFCart()}
          </AppText>
        </View>
        <View style={{ flex: 1 }} />
        <AppButtonWithShadow
          children={
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <AppText
                style={{ color: "white", fontWeight: "bold", marginRight: 8 }}
              >
                Checkout
              </AppText>
              <Ionicons name="arrow-redo-circle" size={24} color="white" />
            </View>
          }
          onPress={handleCheckoutButtonPress}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    //top: 12,

    flex: 1,
    backgroundColor: defaultStyles.Colors.primaeryGrey,
  },
  bottomCheckOutComponent: {
    backgroundColor: defaultStyles.Colors.white,
    padding: 22,
    alignItems: "center",
    //position: "absolute",
    bottom: 0,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    flexDirection: "row",
  },
});

export default CartsScreen;
