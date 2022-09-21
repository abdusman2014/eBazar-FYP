import React from "react";
import { StyleSheet, View, Image } from "react-native";

import defaultStyles from "../../Config/styles";
import AppText from "../AppText";

function AppCategoryWithIcon({ name, image }) {
  //const url = require(image)//"../assets/images/sofa.png";
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Image
          source={require("../../assets/images/sofa-icon.png")}
          style={styles.icon}
        />
      </View>
      <AppText>{name}</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },

  iconContainer: {
    backgroundColor: defaultStyles.Colors.grey300,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 4,
  },
  icon: {
    height: 30,
    width: 30,
    resizeMode: "contain",
  },
});
export default AppCategoryWithIcon;
