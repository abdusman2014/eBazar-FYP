import React from "react";
import { StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import defaultStyles from "../Config/styles";


import UserProfileComponent from "./UserProfileComponent";

function AppTopBar(props) {
  return (
    <View  style={styles.container}>
      <UserProfileComponent
        imageUrl={"../assets/images/profile.jpg"}
        greetingmsg={"Good Morning"}
        name={"Abdullah Usman"}
      />
      <View style={{ flex: 1 }} />
      <Ionicons name="notifications-outline" size={30} color={defaultStyles.Colors.black}/>
      <Ionicons name="heart-outline" style={{margin: 8}} size={30} color={defaultStyles.Colors.black} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default AppTopBar;
