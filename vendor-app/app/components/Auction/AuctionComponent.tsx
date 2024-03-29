import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import AppButtonWithShadow from "../AppButtonWithShadow";
import AppText from "../AppText";
import defaultStyles from "../../config/styles";
import AppSpaceComponent from "../AppSpaceComponent";
const AuctionComponent = ({
  toggleModal,
  name,
  image_url,
  price,
  description,
  id,
 userName,
  isReverseAuction
}) => {
 // console.log("*** ",userName)
  return (
    <View style={styles.productContainer}>
    {isReverseAuction&&  <View style={{flexDirection: 'row'}}>
      <View style={{flex:1}}/>
      <Image
        source={require("../../assets/images/reverse-auction.png")}
        style={{ height: 30, width: 30, right:5, }}
      />
      </View>}
      <Image
        style={styles.image}
        resizeMode="contain"
        source={{
          uri: image_url,
        }}
      />
      <View style={styles.productDetails}>
        <AppText style={defaultStyles.typography.h2}>{name}</AppText>
        <AppText style={defaultStyles.typography.h4}>{description}</AppText>
        <View>
          <AppText style={defaultStyles.typography.h4}>
            Current Price: Rs {price}
          </AppText>
          <AppText style={defaultStyles.typography.h4}>
            Placed by: {userName}
          </AppText>
        </View>
        <AppSpaceComponent height={10} />
        <Button
            title="Place Bid"
            onPress={() => {
              console.log('des: ',description)
              toggleModal(name, price, id,description)}}
          />
        <AppSpaceComponent height={5} />
      </View>
    </View>
  );
};

export default AuctionComponent;

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
    width: Dimensions.get("screen").width-30,
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
