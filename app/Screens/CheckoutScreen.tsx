import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

import AppText from "../Components/AppText";
import defaultStyles from "../Config/styles";
import AppAddressComponent from "../Components/AppAddressComponent";
import AppSpaceComponent from "../Components/AppSpaceComponent";
import useCartStore from "../state-management/UserCart";
import CartItemComponent from "../Components/CartItemComponent";
import AppButtonWithShadow from "../Components/AppButtonWithShadow";

export default function CheckoutScreen(props) {
  const { cartItems } = useCartStore();
  const getTotalPriceOFCart = () => {
    let sum = 0;
    cartItems.forEach((order) => {
      sum += order.noOfItems * order.item.price;
    });
    return sum;
  };
  return (
    <SafeAreaView style={styles.container}>
      <AppText
        style={[defaultStyles.typography.body.large.bold, { padding: 12 }]}
      >
        Shipping Address
      </AppText>
      <View style={{ paddingHorizontal: 12 }}>
        <AppAddressComponent
          title={"Home"}
          description={"House#668, Street#21 I10/4, Islamabad"}
        />
      </View>
      <AppSpaceComponent />
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: defaultStyles.Colors.grey400,
        }}
      />
      <AppSpaceComponent height={10} />
      <AppText
        style={[
          defaultStyles.typography.body.large.bold,
          { paddingHorizontal: 12 },
        ]}
      >
        Order List
      </AppText>
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 20,
        }}
        data={cartItems}
        style={{ padding: 12 }}
        keyExtractor={(item, index) => item.orderId.toString()}
        renderItem={(item) => (
          <CartItemComponent order={item.item} isFromCartScreen={false} />
        )}
        ListFooterComponent={() => (
          <View style={{ marginTop: 8 }}>
            <PriceDetailComponent
              cartPrice={getTotalPriceOFCart()}
              shippingCost={50}
            />
          </View>
        )}
      />
      <View style={styles.bottomPaymentComponent}>
        <AppButtonWithShadow onPress={() => {}}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              width: 300,
              justifyContent: "center",
            }}
          >
            <AppText
              style={{ color: "white", fontWeight: "bold", marginRight: 8 }}
            >
              Continue to payment
            </AppText>
            <Ionicons name="arrow-redo-circle" size={24} color="white" />
          </View>
        </AppButtonWithShadow>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: defaultStyles.Colors.primaeryGrey,
  },
  bottomPaymentComponent: {
    backgroundColor: defaultStyles.Colors.white,
    padding: 22,
    alignItems: "center",

    //position: "absolute",
    bottom: 0,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },
});

function PriceDetailComponent({ cartPrice, shippingCost }) {
  return (
    <View style={PriceDetailComponentStyles.container}>
      <View style={{ flexDirection: "row" }}>
        <AppText style={{ opacity: 0.6 }}>Amount</AppText>
        <View style={{ flex: 1 }} />
        <AppText style={defaultStyles.typography.body.md.semiBold}>
          {"Rs."} {cartPrice}
        </AppText>
      </View>
      <AppSpaceComponent />
      <View style={{ flexDirection: "row" }}>
        <AppText style={{ opacity: 0.6 }}>Shipping</AppText>
        <View style={{ flex: 1 }} />
        <AppText style={defaultStyles.typography.body.md.semiBold}>
          {"Rs."} {shippingCost}
        </AppText>
      </View>
      <AppSpaceComponent />
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: defaultStyles.Colors.grey400,
        }}
      />
      <AppSpaceComponent />
      <View style={{ flexDirection: "row" }}>
        <AppText style={{ opacity: 0.6 }}>Total</AppText>
        <View style={{ flex: 1 }} />
        <AppText style={defaultStyles.typography.body.md.semiBold}>
          {"Rs."} {cartPrice + shippingCost}
        </AppText>
      </View>
    </View>
  );
}

const PriceDetailComponentStyles = StyleSheet.create({
  container: {
    backgroundColor: defaultStyles.Colors.white,
    borderRadius: 30,
    padding: 24,
  },
});
