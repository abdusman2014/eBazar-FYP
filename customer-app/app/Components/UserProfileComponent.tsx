import React from "react";
import { StyleSheet, View, Image, Text, Pressable } from "react-native";

import AppText from "./AppText";
import defaultStyles from "../Config/styles";
import userStore from "../state-management/AppUser";

function UserProfileComponent({ imageUrl, greetingmsg, name }) {
  const { setUser } = userStore();
  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => {
          console.log("press");
          setUser(null);
        }}
      >
      {imageUrl ? <Image
          source={{uri: imageUrl}}
          style={styles.image}
        />:<Image
        source={require("../assets/images/user-profile.png")}
        style={styles.image}
      />}
      </Pressable>
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
