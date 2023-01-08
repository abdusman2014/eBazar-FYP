import { StyleSheet, Text, View, Image, ImageBackground } from "react-native";
import React from "react";

import AppText from "../AppText";
import defaultStyles from "../../Config/styles";
import TopUpButton from "./TopUpButton";

export default function WalletCard() {
  return (
    <View style={styles.container}>
      <ImageBackground
        style={{
          height: 250,
          width: "100%",
          borderRadius: 30,
          overflow: "hidden",
        }}
        source={require("../../assets/images/card2.jpeg")}
      >
        <View style={{ height: "100%", padding: 32 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View>
              <AppText
                style={[
                  defaultStyles.typography.labels.large.bold,
                  { color: "white" },
                ]}
              >
                Usama Ganndu
              </AppText>
              <AppText
                style={[
                  defaultStyles.typography.labels.large.bold,
                  { color: "white" },
                ]}
              >
                **** **** **** 6969
              </AppText>
            </View>
            <View style={{ flex: 1 }} />
            <AppText style={[defaultStyles.typography.h2, { color: "white" }]}>
              VISA
            </AppText>
            <View>
              <AppText
                style={[
                  {
                    color: "white",
                    backgroundColor: "red",
                    paddingHorizontal: 3,
                    paddingVertical: 2,
                    borderRadius: 10,
                    marginLeft: 8,
                  },
                ]}
              >
                Virtual
              </AppText>
            </View>
          </View>
          <View style={{ flex: 1 }} />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View>
              <AppText
                style={[
                  defaultStyles.typography.labels.large.regular,
                  { color: "white" },
                ]}
              >
                Your Balance
              </AppText>
              <AppText
                style={[defaultStyles.typography.h2, { color: "white" }]}
              >
                $ 6,969
              </AppText>
            </View>
            <View style={{ flex: 1 }} />
            <TopUpButton></TopUpButton>
            {/* <AppText style={[defaultStyles.typography.h2, { color: "white" }]}>
              VISA
            </AppText>
            <View>
              <AppText
                style={[
                  {
                    color: "white",
                    backgroundColor: "red",
                    paddingHorizontal: 3,
                    borderRadius: 10,
                    marginLeft: 8,
                  },
                ]}
              >
                Virtual
              </AppText>
            </View> */}
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
  },
});
