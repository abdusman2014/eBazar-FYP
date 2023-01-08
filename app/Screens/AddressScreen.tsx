import { Alert, FlatList, Pressable, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";

import defaultStyles from "../Config/styles";
import mockAddresseData from "../MockData/AddressMockData";
import AppAddressComponent from "../Components/AppAddressComponent";
import AppButtonWithShadow from "../Components/AppButtonWithShadow";
import AppText from "../Components/AppText";
import routes from "../Navigation/routes";
import Address from "../Model/Address";
import usePlaceOrderStore from "../state-management/placeOrder";
import userStore from "../state-management/AppUser";

export default function AddressScreen(props) {
  const { user, addAddressToUser } = userStore();
  const [addresses, setAddresses] = useState(user?.addresses);
  const { addAddress } = usePlaceOrderStore();
  useEffect(() => {
    //add isSelected to each address item
    console.log(user);
    console.log(addresses)
    if (addresses?.length === 0) {
      return;
    }
    console.log(addresses);
    const tempAddresses = addresses.map((element) => ({
      ...element,
      isSelected: false,
    }));
    tempAddresses[0].isSelected = true;
    setAddresses(tempAddresses);
  }, []);
  useEffect(() => {
   setAddresses(user?.addresses);
  }, [user?.addresses]);
  const handleonPressAddress = (address) => {
    const tempAddress = addresses.map((element) =>
      element.addressId === address.addressId
        ? {
            ...element,
            isSelected: true,
          }
        : {
            ...element,
            isSelected: false,
          }
    );

    setAddresses(tempAddress);
  };
  const handlePressOnApply = () => {
    const address = addresses.filter((item) => item.isSelected);
    // console.log(address);
    if (address.length === 0) {
      Alert.alert(
        "Alert",
        "Please Select an Address or add address if no address added",
        [
          {
            text: "OK",
            onPress: () => {
              console.log("OK Pressed");
            },
          },
        ]
      );
    } else {
      addAddress(address[0]);
      props.navigation.navigate({
        name: routes.CHECKOUT_SCREEN,
        merge: true,
      });
    }
  };
  return (
    <View style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={addresses}
        style={{ padding: 16 }}
        keyExtractor={(item, index) => Math.random().toString()}
        renderItem={(item) => (
          <Pressable
            style={{ padding: 8 }}
            onPress={() => {
              handleonPressAddress(item.item);
            }}
          >
            <AppAddressComponent
              title={item.item.title}
              description={item.item.description}
              icon={
                <View style={styles.selectionContainer}>
                  <View
                    style={[
                      styles.selectionInnerContainer,
                      {
                        backgroundColor: item.item.isSelected
                          ? defaultStyles.Colors.black
                          : defaultStyles.Colors.white,
                      },
                    ]}
                  />
                </View>
              }
            />
          </Pressable>
        )}
      />
      <View style={{ flexDirection: "row" }}>
        <View style={{ bottom: 10, padding: 8 }}>
          <AppButtonWithShadow
            onPress={() => {
              props.navigation.navigate(routes.ADD_ADDRESS_SCREEN);
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                width: "50%",
                height: 40,
                justifyContent: "center",
              }}
            >
              <AppText
                style={{ color: "white", fontWeight: "bold", marginRight: 8 }}
              >
                Add New Address
              </AppText>
            </View>
          </AppButtonWithShadow>
        </View>
        <View style={{ bottom: 10, padding: 8 }}>
          <AppButtonWithShadow onPress={handlePressOnApply}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                width: "50%",
                height: 40,
                justifyContent: "center",
              }}
            >
              <AppText
                style={{ color: "white", fontWeight: "bold", marginRight: 1 }}
              >
                Apply
              </AppText>
            </View>
          </AppButtonWithShadow>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: defaultStyles.Colors.primaeryGrey,
  },
  selectionContainer: {
    height: 20,
    width: 20,
    backgroundColor: defaultStyles.Colors.white,
    borderRadius: 10,
    borderWidth: 2.5,
    borderColor: defaultStyles.Colors.black,
    alignItems: "center",
    justifyContent: "center",
  },
  selectionInnerContainer: {
    height: 10,
    width: 10,

    borderRadius: 5,
  },
});
