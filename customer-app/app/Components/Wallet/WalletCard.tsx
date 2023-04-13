import { StyleSheet, Text, View, Image, ImageBackground } from "react-native";
import React from "react";

import AppText from "../AppText";
import defaultStyles from "../../Config/styles";
import TopUpButton from "./TopUpButton";
import routes from "../../Navigation/routes";

export default function WalletCard({ card, onPressTopUp }) {
  const getCardNOInFormat = () => {
    const cardNo: string = card.cardNo.toString();
    return (
      cardNo.substring(0, 4) +
      " " +
      cardNo.substring(4, 8) +
      " " +
      cardNo.substring(8, 12) +
      " " +
      cardNo.substring(12, 16)
    );
  };
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
                {card.ownername.toUpperCase()}
              </AppText>
              <AppText
                style={[
                  defaultStyles.typography.labels.large.bold,
                  { color: "white" },
                ]}
              >
                {getCardNOInFormat()}
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
                Rs {card.balance}
              </AppText>
            </View>
            <View style={{ flex: 1 }} />
            <TopUpButton onPress={onPressTopUp}></TopUpButton>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    //padding: 8,
  },
});
