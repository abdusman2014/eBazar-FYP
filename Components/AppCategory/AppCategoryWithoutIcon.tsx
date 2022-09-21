import React from "react";
import { StyleSheet, View } from "react-native";
import AppText from "../AppText";

import defaultStyles from "../../Config/styles";

function AppCategoryWithoutIcon({ name, isSelected }) {
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: isSelected
            ? defaultStyles.Colors.black
            : defaultStyles.Colors.white,
        },
      ]}
    >
      <AppText
        style={{
          color: isSelected
            ? defaultStyles.Colors.white
            : defaultStyles.Colors.black,
        }}
      >
        {name + " adsasd"}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
    borderColor: defaultStyles.Colors.black,
    borderWidth: 1.5,
    borderRadius: 20,
  },
});

export default AppCategoryWithoutIcon;
