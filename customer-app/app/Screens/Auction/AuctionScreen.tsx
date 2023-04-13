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
import defaultStyles from "../../Config/styles";
import socket from "../../Config/AuctionSocket";
import AppText from "../../Components/AppText";
import AuctionUpdateModal from "../../Components/Auction/AuctionUPdateModal";
import AuctionComponent from "../../Components/Auction/AuctionComponent";
import routes from "../../Navigation/routes";
import userStore from "../../state-management/AppUser";

export default function AuctionScreen(props) {
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState({});
  const [products, setProducts] = useState([]);
  const [myProducts, setMyProducts] = useState([]);
  const [isMyAuction, setIsMyAuction] = React.useState(true);
  const { user } = userStore();
  const createTwoButtonAlert = (data) =>
    Alert.alert("Alert Title", data[0].price, [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "OK", onPress: () => console.log("OK Pressed") },
    ]);

  const toggleModal = (name, price, id,description) => {
    setVisible(true);
    console.log(":: ",description)
    setSelectedProduct({ name, price, id,description });
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
    const myOwnAuctions = data.filter((element) => {
      if (element.owner === user?.uid) {
        return element;
      }
    });
    const otherAuctions = data.filter((element) => {
      if (element.owner !== user?.uid && !element.isReverseAuction) {
        return element;
      }
    });
    // console.log(myOwnAuctions);
    setMyProducts(myOwnAuctions);
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
        <Text style={styles.header}>Auction</Text>
        <View style={{ flex: 1 }} />
        <Entypo
          name="circle-with-plus"
          size={30}
          color="black"
          onPress={() =>
            props.navigation.navigate(routes.AUCTION_ADD_PRODUCT_SCREEN)
          }
        />
      </View>
      <View style={{ flexDirection: "row", paddingVertical: 8 }}>
        <Pressable
          style={{ width: "50%" }}
          onPress={() => setIsMyAuction(!isMyAuction)}
        >
          <AppText
            style={[
              defaultStyles.typography.h3,
              { textAlign: "center", color: isMyAuction ? "black" : "gray" },
            ]}
          >
            My Auctions
          </AppText>
          <View
            style={{
              width: "100%",
              height: 4,
              backgroundColor: isMyAuction ? "black" : "gray",
            }}
          ></View>
        </Pressable>
        <Pressable
          style={{ width: "50%" }}
          onPress={() => setIsMyAuction(!isMyAuction)}
        >
          <AppText
            style={[
              defaultStyles.typography.h3,
              { textAlign: "center", color: !isMyAuction ? "black" : "gray" },
            ]}
          >
            Other Auctions
          </AppText>
          <View
            style={{
              width: "100%",
              height: 4,
              backgroundColor: !isMyAuction ? "black" : "gray",
            }}
          ></View>
        </Pressable>
      </View>
      <View style={styles.mainContainer}>
        {isMyAuction ? (
          <FlatList
            data={myProducts}
          
            key={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <AuctionComponent
                name={item.name}
                image_url={item.image_url}
                price={item.price}
                description={item.description}
                toggleModal={toggleModal}
                id={item.id}
                isMe={item.owner === user.uid}
                isReverseAuction={item.isReverseAuction}
              />
            )}
          />
        ) : (
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
                isMe={item.owner === user.uid}
                isReverseAuction={item.isReverseAuction}
              />
            )}
          />
        )}
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
