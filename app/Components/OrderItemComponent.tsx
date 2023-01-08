import { StyleSheet, View, Image, Pressable, Alert } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

import Order from "../Model/Order";
import Item from "../Model/Item";
import defaultStyles from "../Config/styles";
import AppText from "./AppText";
import AppSpaceComponent from "./AppSpaceComponent";
import useCartStore from "../state-management/UserCart";
import DeliveryStatus from "../Model/DeliveryStatus";
import AppButtonWithShadow from "./AppButtonWithShadow";
import { Ionicons, Octicons } from "@expo/vector-icons";

export default function OrderItemComponent({ item , status, onPress, isFromOrderScreen}) {
  

  function printStatus(status){
    if (status===DeliveryStatus.confirmed)
      return "Confirmed";
    else if (status===DeliveryStatus.inTransit)
      return "In Transit";
    else if (status===DeliveryStatus.pending)
      return "Pending";
    else if (status===DeliveryStatus.delivered)
      return "Delivered";
  }

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={{uri: item.image}}
          style={{
            width: 70,
            height: 100,
            resizeMode: "contain",
          }}
        />
      </View>

      <View style={{ flex: 1 }}>
        <AppSpaceComponent height={10} />
        <View style={{ flexDirection: "row" }}>
          <AppText
            numberOfLines={1}
            style={[defaultStyles.typography.body.large.bold, { width: 150 }]}
          >
            {item.name}
          </AppText>
          
        </View>
        <View style={{flex: 1}} />
        <View style={{flexDirection:'row', margin: 5}} >
          <View style={{ height:20, width: 20, borderRadius:15, backgroundColor:item.color}}/>
          <AppText style={defaultStyles.typography.body.md.regular}>  {item.color} | Qty = {item.noOfItems}</AppText>
        </View>

        <View style={{flex: 1}} />
        <View
          style={{
            backgroundColor: defaultStyles.Colors.grey400,
            borderRadius: 8,
            width: 100,
            alignItems: "center",
          }}
        >
          <AppText style={[defaultStyles.typography.labels.xs, {margin: 2}]}>
            {printStatus(status)}
          </AppText>
        </View>
        
        <View style={{flex: 1}} />
        
        <View style={{ marginVertical: 5, padding: 5 }}>
          <AppText style={defaultStyles.typography.body.large.bold}>
            {"Rs."} {item.price*item.noOfItems}
          </AppText>
          

      <View style={{flex: 1}} />
      {isFromOrderScreen && <View style={styles.buttonContainer}>
      <AppButtonWithShadow onPress={onPress}>
  
          <View style={{flexDirection: "row", width: "100%"}}>
            <AppText
              style={{ color: defaultStyles.Colors.white, fontWeight: "bold"}}
            > Track Order  </AppText>
            <Ionicons name="arrow-redo-circle" size={20} color="white" />
            </View>
        </AppButtonWithShadow>
        </View>}
            
          
        </View>
        <AppSpaceComponent height={5} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
   // width: "100%",
    backgroundColor: defaultStyles.Colors.grey300,
    flexDirection: "row",
    borderRadius: 20,
    padding: 8,
    margin: 8,

    //width: Dimensions.get("window").width - 20,
  },
  imageContainer: {
    backgroundColor: defaultStyles.Colors.primaeryGrey,
    padding: 8,
    borderRadius: 10,
    marginRight: 12,
    // alignSelf: "center",
    // width: "50%",
  },
  text: {
    width: 40,
    flexGrow: 1,
    flex: 1,
  },
  
  buttonContainer: {
    backgroundColor: defaultStyles.Colors.primaeryGrey,
    height: 50,
    width: "75%",
    padding: 3,
  },
});
