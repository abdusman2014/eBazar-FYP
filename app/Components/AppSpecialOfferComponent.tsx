import React from "react";
import { Dimensions, StyleSheet, View, Image, Text } from "react-native";

import defaultStyles from "../Config/styles";
import AppSpaceComponent from "./AppSpaceComponent";
import AppText from "./AppText";

function AppSpecialOfferComponent({headerText, subHeaderText, text, image}) {
  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <AppText
          style={[defaultStyles.typography.body.large.bold, { fontSize: 36 }]}
        >
          {headerText}
        </AppText>
        <AppSpaceComponent height={15} />
        <AppText
          style={[defaultStyles.typography.body.large.bold, { fontSize: 20 }]}
        >
          {subHeaderText}
        </AppText>
        <AppSpaceComponent height={10} />
        <AppText>{text}</AppText>
      </View>

      <View>
        <Image
          source={require("../assets/images/sofa.jpg")}
          style={{ width: 100, height: 150,borderRadius: 20,resizeMode: 'contain' }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",

    backgroundColor: defaultStyles.Colors.primaeryGrey,
    flexDirection: "row",
    borderRadius: 30,
    alignItems: "center",
    padding: 24,
  },
});

export default AppSpecialOfferComponent;
