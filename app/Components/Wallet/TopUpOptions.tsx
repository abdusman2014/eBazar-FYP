import { Pressable, StyleSheet, View } from "react-native";
import React from "react";

import defaultStyles from "../../Config/styles";
import AppText from "../AppText";

export default function TopUpOptions({value, onPress}) {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <AppText>Rs {value}</AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: defaultStyles.Colors.black,
    borderRadius: 20,
    paddingVertical: 4,
    width:90,
    alignItems: "center",
    justifyContent: "center",
  },
});
