import {
  Alert,
  Dimensions,
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { Entypo } from "@expo/vector-icons";
import defaultStyles from "../../config/styles";
import socket from "../../config/AuctionSocket";
import AppText from "../../components/AppText";
import AuctionUpdateModal from "../../components/Auction/AuctionUPdateModal";
import AuctionComponent from "../../components/Auction/AuctionComponent";

export default function AuctionScreen(props) {
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState({});
  const [products, setProducts] = useState([]);
  const createTwoButtonAlert = (data) =>
    Alert.alert("Alert Title", data[0].price, [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "OK", onPress: () => console.log("OK Pressed") },
    ]);

  const toggleModal = (name, price, id, description) => {
    setVisible(true);
    console.log(":: ", description);
    setSelectedProduct({ name, price, id, description });
  };
  useLayoutEffect(() => {
    function fetchProducts() {
      fetch("http://localhost:4000/products")
        .then((res) => res.json())
        .then(setAuctions)
        .catch((err) => setError(err));
    }
    fetchProducts();
  }, []);

  const setAuctions = (data: []) => {
    const otherAuctions = data.filter((element) => {
      if (element.isReverseAuction) {
        return element;
      }
    });
    console.log(otherAuctions);

    setProducts(otherAuctions);
  };

  useEffect(() => {
    socket.on("getProducts", setAuctions);
  }, []);
  if (error !== null) {
    console.log(error);
    return (
      <View
        style={{
          position: "absolute",
          left: Dimensions.get("window").width / 4,
          bottom: Dimensions.get("window").height / 2,
        }}
      >
        <AppText style={[defaultStyles.typography.h1, { textAlign: "center" }]}>
          Error
        </AppText>
        <AppText style={[defaultStyles.typography.h1, { textAlign: "center" }]}>
          Occured
        </AppText>
      </View>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Reverse Auction</Text>
        <View style={{ flex: 1 }} />
      </View>

      <View style={styles.mainContainer}>
        <FlatList
          data={products}
          key={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <AuctionComponent
              name={item.name}
              image_url={item.image_url}
              price={item.price}
              description={item.description}
              toggleModal={toggleModal}
              id={item.id}
              userName={item.userName}
              isReverseAuction={item.isReverseAuction}
            />
          )}
        />
      </View>
      {visible ? (
        <AuctionUpdateModal
          visible={visible}
          setVisible={setVisible}
          selectedProduct={selectedProduct}
        />
      ) : (
        ""
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    //top: 12,

    flex: 1,
    backgroundColor: defaultStyles.Colors.primaeryGrey,
    //justifyContent: "center",
    alignItems: "center",
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
  mainContainer: {
    flex: 1,
    padding: 16,
  },
});
