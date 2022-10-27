import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Octicons } from "@expo/vector-icons";

import defaultStyles from "../Config/styles";
import AppText from "./AppText";

export default function AppPaymentComponent({ text, icon, image }) {
  return (
    <View style={styles.container}>
      <View style={{ padding: 8, marginRight: 8 }}>{image}</View>
      <View>
        <AppText style={defaultStyles.typography.labels.large.bold}>
          {text}
        </AppText>
        {/* <AppText
          numberOfLines={2}
          style={{width: 170}}
        >
          {description}
        </AppText> */}
      </View>
      <View style={{ flex: 1 }} />
      {icon}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",

    borderRadius: 20,
    backgroundColor: defaultStyles.Colors.white,
    alignItems: "center",
    // justifyContent: "center",
    padding: 12,
  },
  addressIcon: {
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: defaultStyles.Colors.grey400,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  addressIconInner: {
    height: 38,
    width: 38,
    borderRadius: 20,
    backgroundColor: defaultStyles.Colors.black,
    alignItems: "center",
    justifyContent: "center",
  },
});
