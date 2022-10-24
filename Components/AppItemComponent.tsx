import React from "react";
import { StyleSheet, View, Image, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Rating } from "react-native-ratings";

import defaultStyles from "../Config/styles";
import AppText from "./AppText";
import AppSpaceComponent from "./AppSpaceComponent";

function AppItemComponent({ item }) {
  const name = item.name;
  const price = item.price;
  const rating = item.rating;
  const image = item.image;
  const soldCount = item.soldCount;
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require("../assets/images/sofa.jpg")}
          style={{
            width: 100,
            height: 150,
            resizeMode: "contain",
          }}
        />
        <View style={styles.like}>
          <Ionicons
            name="heart-outline"
            size={20}
            color={defaultStyles.Colors.white}
          />
        </View>
      </View>
      <AppSpaceComponent height={10} />
      <AppText
        //numberOfLines={2}
        style={[defaultStyles.typography.body.large.bold, { margin: 5 }]}
      >
        {name}
      </AppText>
      <AppSpaceComponent height={10} />
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Rating
          ratingColor={"#000000"}
          ratingCount={1}
          imageSize={30}
          readonly={true}
          startingValue={rating / 5}
        />
        <AppText style={{ margin: 5 }}>{rating}</AppText>
        <View
          style={{
            height: 20,
            width: 1,
            backgroundColor: defaultStyles.Colors.grey700,
          }}
        />
        <ItemSoldComponent soldCount={800} />
      </View>
      <AppSpaceComponent height={10} />
      <AppText style={defaultStyles.typography.body.large.bold}>
        {"$" + price}
      </AppText>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    alignSelf: "baseline",
    //flexWrap:'wrap',
    alignItems: "flex-start",
    width: Dimensions.get("screen").width / 2 - 20,
    //backgroundColor: 'red',
  },
  imageContainer: {
    backgroundColor: defaultStyles.Colors.primaeryGrey,
    padding: 16,
    borderRadius: 10,
    // alignSelf: "center",
    // width: "50%",
  },
  like: {
    //margin: 8,
    position: "absolute",
    top: 8,
    right: 10,
    padding: 5,
    height: 30,
    width: 30,
    backgroundColor: defaultStyles.Colors.black,
    borderRadius: 15,
  },
});

function ItemSoldComponent({ soldCount }) {
  return (
    <View style={itemSoldComponentStyle.container}>
      <AppText>{soldCount + " Sold"}</AppText>
    </View>
  );
}

const itemSoldComponentStyle = StyleSheet.create({
  container: {
    backgroundColor: defaultStyles.Colors.primaeryGrey,
    padding: 8,
    borderRadius: 10,
    marginLeft: 8,
  },
});

export default AppItemComponent;
