import React from "react";
import { StyleSheet, View, Image, TextInput } from "react-native";
import { EvilIcons } from "@expo/vector-icons";


import defaultStyles from "../Config/styles";

function AppSearch({onValueChange}) {
  const [text, onChangeText] = React.useState("");
  return (
    <View style={styles.container}>
      <EvilIcons name="search" size={24} color={defaultStyles.Colors.grey700} />
      <TextInput
        style={styles.input}
        onChangeText={(text) => {
         const val = text.trim();
          onChangeText(text);
          onValueChange(val);
        }}
        placeholder="Search"
        value={text}
      />
      <Image
        source={require("../assets/images/filter.png")}
        style={styles.filter}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 50,
    backgroundColor: defaultStyles.Colors.primaeryGrey,
    flexDirection: "row",
    borderRadius: 10,
    alignItems: "center",
    padding: 8,
  },
  input: {
    flex: 1,
    color: defaultStyles.Colors.grey700,
  },
  filter: {
    width: 24,
    height: 24,
    tintColor: defaultStyles.Colors.grey700,
  },
});

export default AppSearch;
