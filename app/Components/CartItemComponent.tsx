import { StyleSheet, View, Image, Pressable, Alert } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

import Order from "../Model/Order";
import Item from "../Model/Item";
import defaultStyles from "../Config/styles";
import AppText from "./AppText";
import AppSpaceComponent from "./AppSpaceComponent";
import useCartStore from "../state-management/UserCart";

export default function CartItemComponent({ order, isFromCartScreen }) {
  const { incrementItemCount, decrementItemCount, removeItemFromCart } =
    useCartStore();
  const item: Item = order.item;


  const handleOnPressIncrementItemButton = () => {
    incrementItemCount(order.orderId);
  };
  const handleOnPressDeleteButton = () => {
    showAlert(
      "Remove Item",
      "Are you sure you want to remove item from cart?",
      () => {
        removeItemFromCart(order.orderId);
      }
    );
  };
  const handleOnPressDecrementItemButton = () => {
    if (order.noOfItems === 1) {
      showAlert(
        "Remove Item",
        "Are you sure you want to remove item from cart?",
        () => {
          removeItemFromCart(order.orderId);
        }
      );
    } else {
      decrementItemCount(order.orderId);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={{uri: item.image}}
          style={{
            width: 70,
            height: 100,
            resizeMode: "contain",
          }}
        />
      </View>
      <View style={{ flex: 1 }}>
        <AppSpaceComponent height={10} />
        <View style={{ flexDirection: "row" }}>
          <AppText
            numberOfLines={1}
            style={[defaultStyles.typography.body.large.bold, { width: 150 }]}
          >
            {item.name}
          </AppText>
          <View style={{ flex: 1 }} />

          {isFromCartScreen && (
            <Pressable onPress={handleOnPressDeleteButton}>
              <MaterialIcons
                name="delete-outline"
                size={24}
                color="black"
                //style={{ marginLeft: 8 }}
              />
            </Pressable>
          )}
        </View>
        <View style={{ flex: 1 }} />
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <AppText style={defaultStyles.typography.body.large.bold}>
            {"Rs."} {item.price}
          </AppText>
          <View style={{ flex: 1 }} />
          {isFromCartScreen ? (
            <NoOfItemsConponent
              noOfItems={order.noOfItems}
              onPressPlusBtn={handleOnPressIncrementItemButton}
              onPressMinusBtn={handleOnPressDecrementItemButton}
            />
          ) : (
            <View
              style={{
                backgroundColor: defaultStyles.Colors.grey400,
                height: 30,
                width: 30,
                borderRadius: 30,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <AppText style={defaultStyles.typography.labels.large.regular}>
                {order.noOfItems}
              </AppText>
            </View>
          )}
        </View>
        <AppSpaceComponent height={15} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // width: "100%",

    backgroundColor: defaultStyles.Colors.white,
    flexDirection: "row",
    borderRadius: 30,
    padding: 16,
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

function NoOfItemsConponent({ noOfItems, onPressPlusBtn, onPressMinusBtn }) {
  return (
    <View style={NoOfItemsConponentStyle.container}>
      <Pressable onPress={onPressMinusBtn}>
        <AntDesign name="minus" size={16} color="black" />
      </Pressable>
      <AppText
        style={[
          defaultStyles.typography.body.large.bold,
          { marginHorizontal: 14 },
        ]}
      >
        {noOfItems}
      </AppText>
      <Pressable onPress={onPressPlusBtn}>
        <AntDesign name="plus" size={16} color="black" />
      </Pressable>
    </View>
  );
}

const NoOfItemsConponentStyle = StyleSheet.create({
  container: {
    backgroundColor: defaultStyles.Colors.primaeryGrey,
    padding: 8,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
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
