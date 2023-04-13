import React from "react";
import { StyleSheet, View, Image, TextInput, Pressable } from "react-native";
import { EvilIcons, Feather, Entypo } from "@expo/vector-icons";

import defaultStyles from "../Config/styles";
import AppText from "./AppText";

function AppInputField({ onValueChange, label,...inputProps }) {
  const [text, onChangeText] = React.useState("");

  return (
    <View style={styles.container}>
      {/* {label && (
        <AppText style={defaultStyles.typography.labels.large.bold}>
          {label}
        </AppText>
      )} */}
      <TextInput
        style={styles.input}
        onChangeText={(text) => {
          const val = text.trim();
          onChangeText(text);
          onValueChange(val);
        }}
        placeholder={label}
        value={text}
        {...inputProps}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    flex: 1,
  },

  input: {
    borderStyle: "solid",
    borderWidth: 1,
    borderRadius: 5,
    paddingVertical: 5,
    paddingLeft: 5,
    fontSize: 16,
    height: 40,
    color: defaultStyles.Colors.grey700,
  },
  label: {
    paddingVertical: 5,
    fontSize: 16,
    fontWeight: "bold",
    color: defaultStyles.Colors.grey700,
  },
});

export default AppInputField;
