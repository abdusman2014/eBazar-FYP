import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import Order from "../Model/Order";

import AppText from "../Components/AppText";
import defaultStyles from "../Config/styles";
import AppAddressComponent from "../Components/AppAddressComponent";
import AppPaymentComponent from "../Components/AppPaymentComponent";
import AppSpaceComponent from "../Components/AppSpaceComponent";
import { Feather, FontAwesome } from "@expo/vector-icons";
import AppButtonWithShadow from "../Components/AppButtonWithShadow";
import routes from "../Navigation/routes";

import useCartStore from "../state-management/UserCart";

export default function PaymentScreen(props) {
  const {setCartItems} = useCartStore();
  const [COD, setCOD] = useState(false);
  const [card, setCard] = useState(true);
  return (
    <View style={styles.container}>
      <AppText style={defaultStyles.typography.body.md.semiBold}>
        Select the payment method you want to use.
      </AppText>
      <AppSpaceComponent />
      <Pressable
        style={{ padding: 8 }}
        onPress={() => {
          setCOD(!COD);
          setCard(!card);
        }}
      >
        <AppPaymentComponent
          text={".... .... .... 4769"}
          image={<Feather name="credit-card" size={24} color="black" />}
          icon={
            <View style={styles.selectionContainer}>
              <View
                style={[
                  styles.selectionInnerContainer,
                  {
                    backgroundColor: card
                      ? defaultStyles.Colors.black
                      : defaultStyles.Colors.white,
                  },
                ]}
              />
            </View>
          }
        />
      </Pressable>
      <Pressable
        style={{ padding: 8 }}
        onPress={() => {
          setCOD(!COD);
          setCard(!card);
        }}
      >
        <AppPaymentComponent
          text={"COD"}
          image={<FontAwesome name="money" size={24} color="black" />}
          icon={
            <View style={styles.selectionContainer}>
              <View
                style={[
                  styles.selectionInnerContainer,
                  {
                    backgroundColor: COD
                      ? defaultStyles.Colors.black
                      : defaultStyles.Colors.white,
                  },
                ]}
              />
            </View>
          }
        />
      </Pressable>
      <View style={{ flex: 1 }} />
      <AppButtonWithShadow
        onPress={() => {
          showAlert(
            "Order Successfull",
            "You have successfully made order",
            () => {
              const cart: Order[] = [];
              setCartItems(cart);
              //removeItemFromCart(order.orderId);
              props.navigation.navigate({
                name: routes.CART_SCREEN,

                merge: true,
              });
            }
          );
        }}
      >
        <AppText
          style={{
            color: defaultStyles.Colors.white,
            fontWeight: "bold",
            marginRight: 8,
          }}
        >
          PLace Order
        </AppText>
      </AppButtonWithShadow>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
  },
  selectionContainer: {
    height: 20,
    width: 20,
    backgroundColor: defaultStyles.Colors.white,
    borderRadius: 10,
    borderWidth: 2.5,
    borderColor: defaultStyles.Colors.black,
    alignItems: "center",
    justifyContent: "center",
  },
  selectionInnerContainer: {
    height: 10,
    width: 10,

    borderRadius: 5,
  },
});

function showAlert(title: string, message: string, onPressOkBtn) {
  Alert.alert(title, message, [
    {
      text: "Cancel",
      onPress: () => console.log("Cancel Pressed"),
      style: "cancel",
    },
    {
      text: "OK",
      onPress: () => {
        onPressOkBtn();
        console.log("OK Pressed");
      },
    },
  ]);
}
