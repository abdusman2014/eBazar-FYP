import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import WalletCard from "../../Components/Wallet/WalletCard";
import firebase from "../../../firebase";
import userStore from "../../state-management/AppUser";
import Card from "../../Model/Card";
import Lottie from "lottie-react-native";
import routes from "../../Navigation/routes";
import defaultStyles from "../../Config/styles";
import useAuth from "../../auth/useAuth";
import userCardStore from "../../state-management/userCard";
import AppSpaceComponent from "../../Components/AppSpaceComponent";
import AppText from "../../Components/AppText";
import TransactionItem from "../../Components/Wallet/TransactionItem";
import { ScrollView } from "react-native-gesture-handler";

export default function WalletScreen(props) {
  // const [card,setCard] = useState(null);
  const { card, setCard } = userCardStore();
  const auth = useAuth();
  useEffect(() => {
    firebase
      .firestore()
      .collection("Users/" + auth.user?.uid! + "/cards")
      .doc("e-wallet")
      .get()
      .then((doc) => {
        const card = doc.data();
        card.transactionHistory.forEach(
          (item) => (item.date = item.date.toDate())
        );
        setCard(card);
      });
  }, []);
  if (card === null) {
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
      <WalletCard
        card={card}
        onPressTopUp={() => {
          props.navigation.navigate(routes.TOPUP_SCREEN);
        }}
      ></WalletCard>
      <AppSpaceComponent />
      <ScrollView showsVerticalScrollIndicator={false}>
        <AppText style={defaultStyles.typography.labels.large.bold}>
          Transaction History
        </AppText>
        <AppSpaceComponent />

        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 20,
          }}
          data={card.transactionHistory}
          //style={{ paddingVertical: 8 }}
          keyExtractor={(item, index) => Math.random().toString()}
          renderItem={(item) => (
            <View style={{ paddingVertical: 8 }}>
              <TransactionItem transaction={item.item} />
            </View>
          )}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
