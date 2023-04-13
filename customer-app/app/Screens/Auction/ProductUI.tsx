import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import AppButtonWithShadow from "../../Components/AppButtonWithShadow";
import AppText from "../../Components/AppText";
import defaultStyles from "../../Config/styles";
import AppSpaceComponent from "../../Components/AppSpaceComponent";
const ProductUI = ({ toggleModal, name, image_url, price, id, isMe }) => {
  return (
    <View style={styles.productContainer}>
      <Image
        style={styles.image}
        resizeMode="contain"
        source={{
          uri: image_url,
        }}
      />
      <View style={styles.productDetails}>
        <AppText style={defaultStyles.typography.h2}>{name}</AppText>
        <View>
          <AppText style={defaultStyles.typography.h4}>
            Current Price: Rs {price}
          </AppText>
        </View>
        <AppSpaceComponent height={10} />
        {isMe ? (
          <AppButtonWithShadow onPress={() => {}}>
            <AppText
              style={{
                color: defaultStyles.Colors.white,
                fontWeight: "bold",
                marginRight: 8,
              }}
            >
              Accept Bid
            </AppText>
          </AppButtonWithShadow>
        ) : (
          <Button
            title="Place Bid"
            onPress={() => toggleModal(name, price, id)}
          />
        )}
        <AppSpaceComponent height={5} />
      </View>
    </View>
  );
};

export default ProductUI;

const styles = StyleSheet.create({
  bidContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerContainer: {
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
  },
  mainContainer: {
    flex: 1,
    padding: 20,
  },
  productContainer: {
    borderWidth: 1,
    borderColor: "#B2B2B2",
    padding: 10,
    // height: 280,
    backgroundColor: "#fff",
    marginBottom: 10,
    width: Dimensions.get("screen").width,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: 100,
  },
  productDetails: {
    width: "100%",
    // height: "30%",
    padding: 10,
    alignItems: "center",
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
