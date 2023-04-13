import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import React, { useState, useLayoutEffect } from "react";
import socket from "../../Config/AuctionSocket";
import AsyncStorage from "@react-native-async-storage/async-storage";
import userStore from "../../state-management/AppUser";
import AppButtonWithShadow from "../AppButtonWithShadow";
import AppText from "../AppText";
import defaultStyles from "../../Config/styles";
const AuctionUpdateModal = ({ setVisible, selectedProduct }) => {
  const [newPrice, setNewPrice] = useState(selectedProduct.price);
  const { user } = userStore();
  const [userId, setUserId] = useState(user?.uid);
console.log(selectedProduct)
  const updateBidFunction = () => {
    if (Number(newPrice) > Number(selectedProduct.price)) {
      socket.emit("updatePrice", { newPrice, selectedProduct });
      setVisible(false);
    } else {
      Alert.alert("Error!", "New price must be more than the bidding price");
    }
  };
  return (
    <View style={styles.modalContainer}>
      <Text style={styles.modalHeader}>Update Bid</Text>
      <Text style={{ marginBottom: 10 }}>Name: {selectedProduct.name}</Text>
      <Text style={{ marginBottom: 10 }}>Description: {selectedProduct.description}</Text>
      <Text style={{ marginBottom: 10 }}>Price</Text>
      <TextInput
        keyboardType="number-pad"
        style={styles.modalPrice}
        defaultValue={selectedProduct.price}
        onChangeText={(value) => setNewPrice(value)}
      />
      <View
        style={[styles.updateBidBtn, { width: "100%", alignItems: "center" }]}
      >
        <AppButtonWithShadow onPress={updateBidFunction}>
          <AppText
            style={{
              color: defaultStyles.Colors.white,
              fontWeight: "bold",
              marginRight: 8,
            }}
          >
            Bid
          </AppText>
        </AppButtonWithShadow>
        {/* <Pressable style={styles.updateBidBtn} onPress={updateBidFunction}>
					<View>
						<Text style={{ color: "#fff", fontSize: 16, textAlign: "center" }}>
							PLACE BID
						</Text>
					</View>
				</Pressable> */}
      </View>
    </View>
  );
};

export default AuctionUpdateModal;

const styles = StyleSheet.create({
  modalContainer: {
    width: "100%",
    backgroundColor: "#FAF7F0",
    position: "fixed",
    bottom: 10,
    height: 400,
    padding: 20,
    flex: 1,
  },
  modalHeader: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  modalPrice: {
    width: "100%",
    borderWidth: 1,
    padding: 12,
  },
  updateBidBtn: {
    // width: 200,
    paddingHorizontal: 15,

    marginTop: 15,
    borderRadius: 3,
  },
});
