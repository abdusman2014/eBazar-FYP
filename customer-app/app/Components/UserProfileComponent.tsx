import React from "react";
import { StyleSheet, View, Image, Text } from "react-native";

import AppText from "./AppText";
import defaultStyles from "../Config/styles";

function UserProfileComponent({ imageUrl, greetingmsg, name }) {
  return (
    <View style={styles.container}>
      <Image
      source={require("../assets/images/user-profile.png")}
        style={styles.image}
      />
      <View style={{ marginLeft: 8 }}>
        {greetingmsg && <AppText>{greetingmsg}</AppText>}
        <AppText style={defaultStyles.typography.body.large.bold}>
          {name}
        </AppText>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 25,
    resizeMode: "contain",
  },
});

export default UserProfileComponent;
