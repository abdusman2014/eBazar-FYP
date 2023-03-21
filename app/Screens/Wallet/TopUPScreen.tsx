import { Alert, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";

import Lottie from "lottie-react-native";

import AppText from "../../Components/AppText";
import defaultStyles from "../../Config/styles";
import AppInputField from "../../Components/AppInputField";
import AppSpaceComponent from "../../Components/AppSpaceComponent";
import TopUpOptions from "../../Components/Wallet/TopUpOptions";
import AppButtonWithShadow from "../../Components/AppButtonWithShadow";
import firebase from "../../../firebase";

import userCardStore from "../../state-management/userCard";
import userStore from "../../state-management/AppUser";
import useAuth from "../../auth/useAuth";
const amounts = [10, 20, 50, 100, 200, 250, 500, 750, 1000];

export default function TopUPScreen(props) {
  const [isLoading, setIsLoading] = useState(false);
  const { card, topUp, addTransaction } = userCardStore();
  const auth = useAuth();
  const [amount, setAmount] = useState("");
  const onPressTopUp = () => {
    console.log(card);
    if (amount === "") {
      Alert.alert("Required", "Please Enter Amount.");
      return;
    }
    setIsLoading(true);
    console.log(card);

    firebase
      .firestore()
      .collection("Users/" + auth.user?.uid! + "/cards")
      .doc("e-wallet")
      .update({
        balance: card?.balance! + +amount,
      })
      .then(() => {
        console.log("User updated!");
        // topUp(+amount);
        const transaction: {
          title: string;
          image: string | null;
          amount: number;
          isTopUp: boolean;
          date: Date;
        } = {
          title: "Top Up Wallet",
          image: null,
          amount: +amount,
          isTopUp: true,
          date: new Date(),
        };
        const tranHis = card?.transactionHistory;
        tranHis?.push(transaction);
        firebase
          .firestore()
          .collection("Users/" + auth.user?.uid! + "/cards")
          .doc("e-wallet")
          .update({
            transactionHistory: tranHis,
          })
          .then(() => {
            console.log("User updated!");
            topUp(+amount);
            addTransaction(tranHis!);
            setIsLoading(false);
            Alert.alert("Susseccfull", "Wallet topped up.");
          })
          .catch((e) => {
            Alert.alert("Failed", "Please Try Again Later.");
          });
      })
      .catch((e) => {
        Alert.alert("Failed", "Please Try Again Later.");
      });
  };
  if (isLoading) {
    return (
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <View style={{ height: 100 }} />
        <Lottie
          source={require("../../assets/progress.json")}
          autoPlay
          loop
          style={{ height: 600, width: 600 }}
        />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <AppText
        style={[
          defaultStyles.typography.body.large.bold,
          { textAlign: "center" },
        ]}
      >
        Enter the amount of top up
      </AppText>
      <AppSpaceComponent height={50} />
      <View style={styles.input}>
        <TextInput
          style={{ fontSize: 40 }}
          onChangeText={(text) => {
            const val = text.trim();
            setAmount(val);
            // onValueChange(val);
          }}
          placeholder="Rs 500"
          value={amount}
          keyboardType="numeric"
        />
      </View>
      <AppSpaceComponent />
      {/* <TopUpOptions value={10}/> */}
      <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
        {amounts?.map((val, key) => {
          return (
            <View style={{ padding: 12 }} key={val.toString()}>
              <TopUpOptions
                value={val}
                onPress={() => {
                  setAmount(val.toString());
                }}
              />
            </View>
          );
        })}
      </View>
      <View style={{ flex: 1 }} />
      <View style={{ bottom: 50 }}>
        <AppButtonWithShadow onPress={onPressTopUp}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              width: "100%",
              justifyContent: "center",
            }}
          >
            <AppText
              style={{
                color: "white",
                fontWeight: "bold",
                marginRight: 8,
              }}
            >
              Continue
            </AppText>
          </View>
        </AppButtonWithShadow>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: 50,
    //alignItems: "center",
    padding: 16,
  },
  input: {
    borderStyle: "solid",
    borderWidth: 1,
    borderRadius: 25,
    paddingVertical: 5,
    paddingLeft: 5,
    fontSize: 16,
    height: 150,
    width: "100%",
    color: defaultStyles.Colors.grey700,
    alignItems: "center",
    justifyContent: "center",
  },
});
