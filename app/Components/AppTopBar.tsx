import React from "react";
import { StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import defaultStyles from "../Config/styles";

import userStore from "../state-management/AppUser";


import UserProfileComponent from "./UserProfileComponent";
import useAuth from "../auth/useAuth";
function AppTopBar(props) {
  const auth = useAuth();
  return (
    <View  style={styles.container}>
      <UserProfileComponent
        imageUrl={auth.user?.image}
        greetingmsg={"Good Morning"}
        name={auth.user?.name.toUpperCase()}
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
