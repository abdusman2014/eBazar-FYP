import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
} from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

import Order from "../Model/Order";
import Item from "../Model/Item";
import defaultStyles from "../Config/styles";
import AppText from "./AppText";
import AppSpaceComponent from "./AppSpaceComponent";

export default function CartItemComponent({ order }) {
  const item: Item = order.item;
  console.log("item: ", item, ", ", order.noOfItems);

  //  console.log("item: ", order);
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require("../assets/images/sofa.jpg")}
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
          <MaterialIcons
            name="delete-outline"
            size={24}
            color="black"
            //style={{ marginLeft: 8 }}
          />
        </View>
        <View style={{ flex: 1 }} />
        <View style={{ flexDirection: "row", alignItems: 'center' }}>
          <AppText style={defaultStyles.typography.body.large.bold}>
            {"Rs."} {item.price}
          </AppText>
          <View style={{ flex: 1 }} />
          <NoOfItemsConponent noOfItems={order.noOfItems} />
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

function NoOfItemsConponent({ noOfItems }) {
  return (
    <View style={NoOfItemsConponentStyle.container}>
      <AntDesign name="minus" size={16} color="black" />
      <AppText
        style={[
          defaultStyles.typography.body.large.bold,
          { marginHorizontal: 14 },
        ]}
      >
        {noOfItems}
      </AppText>
      <AntDesign name="plus" size={16} color="black" />
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
