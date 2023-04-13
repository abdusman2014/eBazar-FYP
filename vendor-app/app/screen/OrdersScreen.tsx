import { Alert, Dimensions, Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import firebase from "../../firebase";
import AppText from "../components/AppText";
import ActiveOrders from "../components/ActiveOrders";
import defaultStyles from "../config/styles";
import Lottie from "lottie-react-native";
export default function OrdersScreen(props) {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  React.useEffect(() => {
    const orders = [];
    // user?.orders.forEach(orderId=>{

    // })

    firebase
      .firestore()
      .collection("Orders")
      //.where("orderId", "in", user?.orders)
      .get()
      .then((snapshot) => {
        // console.log(":: ",doc)
        const orders = [];
        snapshot.forEach((item) => {
          orders.push(item.data());
        });
       console.log(orders[0]);
       setOrders(orders);
        setIsLoading(false);
      })
      .catch((e) => {
        setIsLoading(false);
        console.log(e);
        Alert.alert("Failed", "Try Again Later");
      });
  }, []);
  if(isLoading){
    return (
      <View style={{flex:1, alignItems: "center", justifyContent: "center" }}>
        <View style={{ height: 100 }} />
        <Lottie
          source={require("../assets/progress.json")}
          autoPlay
          loop
          //style={{ height: 600, width: 600 }}
        />
      </View>
    );
  }
  return (
    <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Orders</Text>
        <View style={{ flex: 1 }} />
      </View>
     {orders.length===0 && <View
        style={{
          position: "absolute",
          left: Dimensions.get("window").width / 4,
          bottom: Dimensions.get("window").height / 2,
        }}
      >
        <AppText style={defaultStyles.typography.h1}>No Orders</AppText>
      </View>}
      <ActiveOrders Order={orders} props={props}></ActiveOrders>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBar: {
    flexDirection: "row",
    paddingTop: 50,
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    padding: 16,
  },
  headerContainer: {
    padding: 15,
    flexDirection: "row",
    // justifyContent: "space-between",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
