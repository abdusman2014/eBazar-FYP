import {
  Alert,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import React, { useEffect } from "react";
import AppText from "../Components/AppText";
import defaultStyles from "../Config/styles";
import AppAddressComponent from "../Components/AppAddressComponent";
import AppSpaceComponent from "../Components/AppSpaceComponent";
import useCartStore from "../state-management/UserCart";
import CartItemComponent from "../Components/CartItemComponent";
import AppButtonWithShadow from "../Components/AppButtonWithShadow";
import mockAddresseData from "../MockData/AddressMockData";
import usePlaceOrderStore from "../state-management/placeOrder";
import routes from "../Navigation/routes";
import userStore from "../state-management/AppUser";

export default function CheckoutScreen(props) {
  const { address, addAddress,cart,userDetails } = usePlaceOrderStore();
  const {user} = userStore();
  // useEffect(() => {
    
  //    console.log('eneter: ',props.route.params);
  //   if (props.route.params?.screen === routes.ADDRESS_SCREEN) {
  //     //gets data returned from vehicle list screen
  //     const returnAddress = mockAddresseData.filter(
  //       (item) => (item.addressId === props.route.params?.addressId)
  //     );
  //     //console.log(returnAddress,',, ',props.route.params?.addressId)
  //     addAddress(returnAddress[0]);
  //    // console.log('add',address);
  //   }
  // }, [props.route.params]);
  useEffect(() => {
    if (address === null && user?.addresses.length>0) {
      addAddress(user?.addresses[0]!);
    }
  }, []);
  const { cartItems } = useCartStore();
  const getTotalPriceOFCart = () => {
    let sum = 0;
    cartItems.forEach((order) => {
      sum += order.noOfItems * order.item.price;
    });
    return sum;
  };
  const handleOnPressAddressComponent = () => {
    props.navigation.navigate(routes.ADDRESS_SCREEN);
  };
  // if (address === null) {
  //   return <AppText>loading</AppText>;
  // }
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <AppText
          style={[defaultStyles.typography.body.large.bold, { padding: 12 }]}
        >
          Shipping Address
        </AppText>
        { <View style={{ paddingHorizontal: 12 }}>
          <Pressable onPress={handleOnPressAddressComponent}>
            <AppAddressComponent
              title={(address) ? address.title : ""}
              description={(address) ?address.description: ""}
              icon={<Octicons name="pencil" size={24} color="black" />}
            />
          </Pressable>
        </View>}
        <AppSpaceComponent />
        <View
          style={{
            height: 1,
            width: "100%",
            backgroundColor: defaultStyles.Colors.grey400,
          }}
        />
        <AppSpaceComponent height={10} />
        <AppText
          style={[
            defaultStyles.typography.body.large.bold,
            { paddingHorizontal: 12 },
          ]}
        >
          Order List
        </AppText>
        {cartItems.map((item) => (
          <CartItemComponent
            key={Math.random()}
            order={item}
            isFromCartScreen={false}
          />
        ))}
        <View style={{ margin: 8, marginBottom: 118 }}>
          <PriceDetailComponent
            cartPrice={getTotalPriceOFCart()}
            shippingCost={50}
          />
        </View>
      </ScrollView>
      <View style={styles.bottomPaymentComponent}>
        <AppButtonWithShadow onPress={() => {
          // console.log('address: ',address);
          // console.log('cart: ',cart);
          // console.log('user: ',userDetails);
          if(address===null){
            Alert.alert("Address", "Please select shipping address");
            return;
          }
          props.navigation.navigate(routes.PAYMENT_SCREEN);
        }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              width: "100%",
              justifyContent: "center",
            }}
          >
            <AppText
              style={{ color: defaultStyles.Colors.white, fontWeight: "bold", marginRight: 8 }}
            >
              Continue to payment
            </AppText>
            <Ionicons name="arrow-redo-circle" size={24} color="white" />
          </View>
        </AppButtonWithShadow>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: defaultStyles.Colors.primaeryGrey,
  },
  bottomPaymentComponent: {
    backgroundColor: defaultStyles.Colors.white,
    padding: 22,
    alignItems: "center",
    width: "100%",
    position: "absolute",
    bottom: 0,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },
});

function PriceDetailComponent({ cartPrice, shippingCost }) {
  return (
    <View style={PriceDetailComponentStyles.container}>
      <View style={{ flexDirection: "row" }}>
        <AppText style={{ opacity: 0.6 }}>Amount</AppText>
        <View style={{ flex: 1 }} />
        <AppText style={defaultStyles.typography.body.md.semiBold}>
          {"Rs."} {cartPrice}
        </AppText>
      </View>
      <AppSpaceComponent />
      <View style={{ flexDirection: "row" }}>
        <AppText style={{ opacity: 0.6 }}>Shipping</AppText>
        <View style={{ flex: 1 }} />
        <AppText style={defaultStyles.typography.body.md.semiBold}>
          {"Rs."} {shippingCost}
        </AppText>
      </View>
      <AppSpaceComponent />
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: defaultStyles.Colors.grey400,
        }}
      />
      <AppSpaceComponent />
      <View style={{ flexDirection: "row" }}>
        <AppText style={{ opacity: 0.6 }}>Total</AppText>
        <View style={{ flex: 1 }} />
        <AppText style={defaultStyles.typography.body.md.semiBold}>
          {"Rs."} {cartPrice + shippingCost}
        </AppText>
      </View>
    </View>
  );
}

const PriceDetailComponentStyles = StyleSheet.create({
  container: {
    backgroundColor: defaultStyles.Colors.white,
    borderRadius: 30,
    padding: 24,
  },
});
