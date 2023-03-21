import React from "react";
import {
  View,
  Image,
  Pressable,
  Alert,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import AppText from "../Components/AppText";
import OrderItemComponent from "../Components/OrderItemComponent";
import useCartStore from "../state-management/UserCart";
import { FlatList } from "react-native-gesture-handler";
import Lottie from "lottie-react-native";


import defaultStyles from "../Config/styles";
import Item from "../Model/Item";
import DeliveryStatus from "../Model/DeliveryStatus";
import PaymentStatus from "../Model/PaymentStatus";
import PaymentType from "../Model/PaymentType";
import App from "../../App";
import { StatusBar } from "expo-status-bar";
import ActiveOrders from "../Components/ActiveOrders";
import CompletedOrders from "../Components/CompletedOrders";
import Order from "../Model/Order";
import routes from "../Navigation/routes";
import firebase from '../../firebase';
import userStore from "../state-management/AppUser";
import useAuth from "../auth/useAuth";

function OrdersScreen(props) {
  const { cartItems } = useCartStore();
  const auth = useAuth();
  const layout = useWindowDimensions();
  const [isActive, setIsActive] = React.useState(true);
  const [index, setIndex] = React.useState(0);
  const [active, setActive] = React.useState();
  const [completed, setCompleted] = React.useState(null);
  const [isLoading,setIsLoading] = React.useState(true);

  //
  React.useEffect(() => {
    const orders = [];
    auth.user?.orders.forEach(orderId=>{

    })
     firebase
    .firestore()
    .collection("Orders")
    .where('orderId', 'in', auth.user?.orders)
    .get().then(snapshot=>{
      const doc:[] = [];
      snapshot.forEach(document => {
        doc.push(document.data());
      });
      
      const orders = doc;
      console.log(orders);
      const b = orders.filter(
        (item) => item.deliveryStatus === DeliveryStatus.delivered
      );
      setCompleted(b);
      const a = orders.filter(
        (item) => item.deliveryStatus !== DeliveryStatus.delivered
      );
      setActive(a);
      setIsLoading(false);
    }).catch(e=>{
      setIsLoading(false);
      console.log(e)
      Alert.alert("Failed", "Try Again Later");
    })
  
  }, []);

  /*   if (cartItems.length === 0) {
    return (
      <View style={{
        padding: 5,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}>
        <Image source={require("../assets/images/orders-empty.png")}
        style={{
          width: 350,
          height: 350,
          resizeMode: "cover",
        }}/>
        <AppText style={defaultStyles.typography.h3}> You dont have an order yet</AppText>
      </View>
    );
  } else */
  if (isLoading) {
    return (
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <View style={{ height: 100 }} />
        <Lottie
          source={require("../assets/progress.json")}
          autoPlay
          loop
          style={{ height: 600, width: 600 }}
        />
      </View>
    );
  }
  return (
    /* <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}'
          initialLayout={{ width: layout.width }}
          navigation
          style={styles.TabBar}
    >
    
    </TabView> */

    <View style={{ backgroundColor:'white',flex: 1 }}>
      <View style={{ flexDirection: "row", paddingVertical: 8 }}>
        <Pressable
          style={{ width: "50%" }}
          onPress={() => setIsActive(!isActive)}
        >
          <AppText
            style={[
              defaultStyles.typography.h3,
              { textAlign: "center", color: isActive ? "black" : "gray" },
            ]}
          >
            Active
          </AppText>
          <View
            style={{
              width: "100%",
              height: 4,
              backgroundColor: isActive ? "black" : "gray",
            }}
          ></View>
        </Pressable>
        <Pressable
          style={{ width: "50%" }}
          onPress={() => setIsActive(!isActive)}
        >
          <AppText
            style={[
              defaultStyles.typography.h3,
              { textAlign: "center", color: !isActive ? "black" : "gray" },
            ]}
          >
            Completed
          </AppText>
          <View
            style={{
              width: "100%",
              height: 4,
              backgroundColor: !isActive ? "black" : "gray",
            }}
          ></View>
        </Pressable>
      </View>

      {active && completed && isActive ? (
        <ActiveOrders
          Order={active}
          props={props}
        ></ActiveOrders>
      ) : (
        <CompletedOrders Order={completed} props={props}></CompletedOrders>
      )}
    </View>
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
});
export default OrdersScreen;
