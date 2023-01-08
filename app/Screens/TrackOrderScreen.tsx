import { StyleSheet, Text, View } from "react-native";
import React from "react";
import OrderItemComponent from "../Components/OrderItemComponent";

import { Ionicons, Octicons } from "@expo/vector-icons";
import DeliveryStatus from "../Model/DeliveryStatus";
import AppText from "../Components/AppText";

import defaultStyles from "../Config/styles";
import { useState } from "react";
import { useEffect } from "react";

const TrackOrderScreen = (props) => {
  const [item, setItem] = useState(props.item);
  //const [status, setStatus] = useState(props.status);
  const done = "black";
  const notDone = "grey";
  console.log("item::::", props.status);
  const [myStatus, setMyStatus] = React.useState([
    notDone,
    notDone,
    notDone,
    notDone,
  ]);

  useEffect(()=>{
    const status = [
      notDone,
      notDone,
      notDone,
      notDone,
    ];
    for(let i=0;i<props.status;++i){
        status[i] = done;
    }
    setMyStatus(status);
  },[]);

  function printItemStatus(status) {
    if (props.status === DeliveryStatus.confirmed) {
   //   setMyStatus([done, done, notDone, notDone]);
      return "Your order is getting ready to be shipped";
    } else if (props.status === DeliveryStatus.inTransit) {
    //  setMyStatus([done, done, done, notDone]);
      return "Your Order is in Transit";
    } else if (props.status === DeliveryStatus.pending) {
     // setMyStatus([done, notDone, notDone, notDone]);
      return "Your Order is processing";
    } else if (props.status === DeliveryStatus.delivered) {
    //  setMyStatus([done, done, done, done]);
      return "Order has been Delivered";
    }
  }

  return (
    <View style={{flex: 1,backgroundColor: 'white'}}>
     
      {/* <OrderItemComponent Order={Order} status={status}/> */}
      <OrderItemComponent item={item} status={props.status} onPress={() => {}} isFromOrderScreen={false}
      />
      <View style={[styles.container]}>
        <Ionicons name="cube" size={40} color={myStatus[0]} />
        <View style={{width: 65}}/>
        <Ionicons name="exit" size={40} color={myStatus[1]} />
        <View style={{width: 65}}/>
        <Ionicons name="boat" size={40} color={myStatus[2]} />
        <View style={{width: 65}}/>
        <Ionicons name="logo-dropbox" size={40} color={myStatus[3]} />
      </View>
      <View style={[styles.container]}>
        <Ionicons name="checkmark-circle" size={25} color={myStatus[0]} />
        <View style={{width: 20}}/>
        <Octicons name="kebab-horizontal" size={46} />
        <View style={{width: 20}}/>
        <Ionicons name="checkmark-circle" size={25} color={myStatus[1]} />
        <View style={{width: 20}}/>
        <Octicons name="kebab-horizontal" size={46} />
        <View style={{width: 20}}/>
        <Ionicons name="checkmark-circle" size={25} color={myStatus[2]} />
        <View style={{width: 20}}/>
        <Octicons name="kebab-horizontal" size={46} />
        <View style={{width: 20}}/>
        <Ionicons name="checkmark-circle" size={25} color={myStatus[3]} />
      </View>
      <AppText style={[defaultStyles.typography.h3, { margin: 15 }]}>
        Order Status Detials: 
      </AppText>
      <AppText style={[defaultStyles.typography.h3, { margin: 15 ,color: 'grey',textAlign: 'center'}]}>
       {printItemStatus(props.status)}
      </AppText>
      {/* <View style={[styles.container, { marginTop: 150 }]}>
        <Ionicons name="cube" size={40} color={myStatus[0]} />
        <Ionicons name="exit" size={40} color={myStatus[1]} />
        <Ionicons name="boat" size={40} color={myStatus[2]} />
        <Ionicons name="logo-dropbox" size={40} color={myStatus[3]} />
      </View>
      <View style={[styles.container]}>
        <Ionicons name="checkmark-circle" size={25} color={myStatus[0]} />
        <Octicons name="kebab-horizontal" size={16} />
        <Ionicons name="checkmark-circle" size={25} color={myStatus[1]} />
        <Octicons name="kebab-horizontal" size={16} />
        <Ionicons name="checkmark-circle" size={25} color={myStatus[2]} />
        <Octicons name="kebab-horizontal" size={16} />
        <Ionicons name="checkmark-circle" size={25} color={myStatus[3]} />
      </View>
      <AppText style={[defaultStyles.typography.h3, { margin: 15 }]}>
        {" "}
        Order Status Detials
      </AppText> */}
    </View>
  );
};

export default TrackOrderScreen;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    //alignItems: "center",
   // backgroundColor:'red',
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    justifyContent: "center",
    margin: 50,
    color: "black",
  },
});
