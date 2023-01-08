import { StyleSheet, Image, View } from "react-native";
import React from "react";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import Moment from "moment";

import defaultStyles from "../../Config/styles";
import AppText from "../AppText";

export default function TransactionItem({ transaction }) {
  // const date: Date = transaction.date.toDate();//new Date(transaction.date * 1000);
  // console.log(date);
  return (
    <View style={styles.container}>
      {transaction.image ? (
        <Image source={{ uri: transaction.image }} style={styles.image} />
      ) : (
        <View
          style={{
            height: 50,
            width: 50,
            borderRadius: 25,
            backgroundColor: defaultStyles.Colors.grey400,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              height: 35,
              width: 35,
              borderRadius: 20,
              backgroundColor: defaultStyles.Colors.black,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Entypo
              name="wallet"
              size={20}
              color={defaultStyles.Colors.grey300}
            />
          </View>
        </View>
      )}
      <View style={{ marginLeft: 8 }}>
        <AppText style={defaultStyles.typography.labels.large.bold}>
          {transaction.title}
        </AppText>
        <AppText
          style={[
            defaultStyles.typography.body.md.semiBold,
            { color: defaultStyles.Colors.grey600 },
          ]}
        >
          {Moment(transaction.date).format("MMM DD, YYYY | hh:mm A")}
        </AppText>
      </View>
      <View style={{ flex: 1 }} />
      <View style={{ marginLeft: 8, alignItems: "flex-end" }}>
        <AppText style={defaultStyles.typography.labels.large.bold}>
          ${transaction.amount}
        </AppText>
        {transaction.isTopUp ? (
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <AppText
              style={[
                defaultStyles.typography.body.md.semiBold,
                { color: defaultStyles.Colors.grey600 },
              ]}
            >
              Top UP
            </AppText>
            <View
              style={{
                height: 18,
                width: 18,
                borderRadius: 5,
                backgroundColor: defaultStyles.Colors.blue600,
                marginLeft: 4,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <AntDesign
                name="arrowup"
                size={13}
                color={defaultStyles.Colors.white}
              />
            </View>
          </View>
        ) : (
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <AppText
              style={[
                defaultStyles.typography.body.md.semiBold,
                { color: defaultStyles.Colors.grey600 },
              ]}
            >
              Top UP
            </AppText>
            <View
              style={{
                height: 18,
                width: 18,
                borderRadius: 5,
                backgroundColor: defaultStyles.Colors.red500,
                marginLeft: 4,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <AntDesign
                name="arrowdown"
                size={13}
                color={defaultStyles.Colors.white}
              />
            </View>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    resizeMode: "contain",
  },
});
