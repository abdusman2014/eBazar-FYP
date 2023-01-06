import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";

import defaultStyles from "../../Config/styles";
import Gender from "../../Model/Gender";
import AppText from "../AppText";

export default function AppGenderComponent({ gender, onChangeGender }) {
  return (
    <View>
      <AppText style={defaultStyles.typography.body.large.bold}>Gender</AppText>
      <View style={{ flexDirection: "row" }}>
        <View style={{ flex: 1 }} />
        <Pressable
          style={[
            styles.container,
            {
              borderColor:
                gender === null || gender === Gender.female ? "black" : "red",
              borderWidth: gender === null || gender === Gender.female ? 1 : 2,
            },
          ]}
          onPress={
            ()=>{
                onChangeGender(Gender.male)
            }
          }
        >
          <FontAwesome name="male" size={44} color="black" />
        </Pressable>
        <View style={{ flex: 1 }} />
        <Pressable   style={[
            styles.container,
            {
              borderColor:
                gender === null || gender === Gender.male ? "black" : "red",
              borderWidth: gender === null || gender === Gender.male ? 1 : 2,
            },
          ]}
          onPress={
            ()=>{
                onChangeGender(Gender.female)
            }
          }
          >
          <FontAwesome name="female" size={44} color="black" />
        </Pressable>
        <View style={{ flex: 1 }} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 70,
    height: 70,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: defaultStyles.Colors.grey400,
    borderRadius: 35,
    borderColor: defaultStyles.Colors.black,
    borderWidth: 1,
  },
});
