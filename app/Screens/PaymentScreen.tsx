import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import Lottie from "lottie-react-native";

import Order from "../Model/Order";

import AppText from "../Components/AppText";
import defaultStyles from "../Config/styles";
import AppAddressComponent from "../Components/AppAddressComponent";
import AppPaymentComponent from "../Components/AppPaymentComponent";
import AppSpaceComponent from "../Components/AppSpaceComponent";
import { Feather, FontAwesome } from "@expo/vector-icons";
import AppButtonWithShadow from "../Components/AppButtonWithShadow";
import routes from "../Navigation/routes";
import firebase from "../../firebase";

import useCartStore from "../state-management/UserCart";
import usePlaceOrderStore from "../state-management/placeOrder";
import userStore from "../state-management/AppUser";
import PaymentStatus from "../Model/PaymentStatus";
import PaymentType from "../Model/PaymentType";
import usePlaceOrderStore from "../state-management/placeOrder";

export default function PaymentScreen(props) {
  const { resetCart } = useCartStore();
  const {resetpaymentState} = usePlaceOrderStore();
  const { addOrder, user } = userStore();
  const {
    updatePaymentStatus,
    updatePaymentType,
    address,
    userDetails,
    cart,
    paymentStatus,
    paymentType,
    totalPrice,
    deliveryStatus
  } = usePlaceOrderStore();
  const [COD, setCOD] = useState(false);
  const [card, setCard] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const onPressPlaceOrder = () => {
    showAlert(
      "PLace Order",
      "Are you sure you want to place Order",
      () => {
        setIsLoading(true);
        console.log("cod: ", COD, " ,card: ", card);
        updatePaymentStatus(PaymentStatus.PENDING);
        if (COD) {
          updatePaymentType(PaymentType.COD);
        } else {
          updatePaymentType(PaymentType.CARD);
        }
        console.log("ref: ", firebase.firestore());
        const docRef = firebase.firestore().collection("Orders").doc();
        const id = docRef.id;
        docRef
          .set({
            address: address,
            userDetails: userDetails,
            cart: cart,
            paymentStatus: paymentStatus,
            paymentType: paymentType,
            totalPrice: totalPrice,
            orderId: id,
            deliveryStatus: deliveryStatus,
          })
          .then((res) => {
            console.log("Order Placed! ", res);
            addOrder(id);
            firebase
              .firestore()
              .collection("Users")
              .doc(user?.uid)
              .update({
                orders: user?.orders,
              })
              .then(() => {
                console.log("User updated!");
                setIsLoading(false);
              });
            Alert.alert("Success", "Order placed successfully", [
              {
                text: "OK",
                onPress: () => {
                 
                  resetCart();
                  resetpaymentState();
                  //removeItemFromCart(order.orderId);
                  props.navigation.navigate({
                    name: routes.CART_SCREEN,

                    merge: true,
                  });
                  console.log("OK Pressed");
                },
              },
            ]);
          })
          .catch((e) => {
            console.log("error: ", e);
          });
        // updatePaymentType(PaymentType.COD);
      }
    );
  }
  if (isLoading) {
    return (
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <View style={{ height: 100 }} />
        <Lottie
          source={require("../assets/progress.json")}
          autoPlay
          loop
          style={{ height: 600, width: 600 }}
        />
      </View>
    );
  }
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
        onPress={onPressPlaceOrder}
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
