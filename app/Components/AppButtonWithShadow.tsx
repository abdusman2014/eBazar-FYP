import { StyleSheet, Platform, View, Pressable, TouchableOpacity } from "react-native";
import React from "react";
import defaultStyles from "../Config/styles";
import AppText from "./AppText";

export default function AppButtonWithShadow({ children, onPress,color }) {
  return (
    <Pressable style={[styles.container,{backgroundColor:(color)? color: defaultStyles.Colors.black}]} onPress={onPress}>
      {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 32,
    paddingVertical: 12,
    backgroundColor: defaultStyles.Colors.black,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    shadowOffset: { width: 0, height: 8 },
    ...Platform.select({
      ios: {
        shadowColor: "rgba(51, 51, 51, 0.8",
        shadowOpacity: 0.4,
        shadowRadius: 5,
      },
      android: {
        elevation: 10.34,
        shadowColor: "rgba(51, 51, 51, 1)",
        shadowRadius: 12,
      },
    }),
  },
});
