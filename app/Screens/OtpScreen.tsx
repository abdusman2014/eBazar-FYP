import { SafeAreaView, StyleSheet, Image, View, Alert } from "react-native";
import React from "react";
import AppText from "../Components/AppText";
import AppSpaceComponent from "../Components/AppSpaceComponent";
import AppInputField from "../Components/AppInputField";
import AppButtonWithShadow from "../Components/AppButtonWithShadow";
import defaultStyles from "../Config/styles";
import firebase from "../../firebase";

import * as Progress from "react-native-progress";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import routes from "../Navigation/routes";

export default function OtpScreen(props) {
  const [code, onChangeCode] = React.useState("");
  const [isLoading, onChangeIsLoading] = React.useState(false);
  //console.log("next code: ", props.verificationId);
  const confirmCode = () => {
    onChangeIsLoading(true);
    const credential = firebase.auth.PhoneAuthProvider.credential(
      props.verificationId,
      code
    );
    firebase
      .auth()
      .signInWithCredential(credential)
      .then((result) => {
        // Do something with the results here
        console.log(result.additionalUserInfo.isNewUser);
        onChangeIsLoading(false);
        //user object must be created as state object
        //TODO:: if new user create user object save uid, leave other fields as "" and then move to userProfileInput screen
        //else if old user fetch data from firebase, save it to user object and move to home screen
        if(result.additionalUserInfo.isNewUser){
          //move to userProfileInput screen
        }
        else{
          props.navigation.navigate(routes.APP_NAVIGATION);
        }
       
      })
      .catch((err) => {
        console.log(err);
        onChangeIsLoading(false);
        Alert.alert("Authentication Failed", "Code Invalid or Expired.");
      });
  };
  return (
    <SafeAreaView style={styles.container}>
      {/* <View style={{position:'absolute'}}>
      <Progress.Circle size={30} indeterminate={true} />
      </View> */}

      <Image
        source={require("../assets/images/logo.png")}
        style={{
          width: 130,
          height: 130,
          borderRadius: 20,
          resizeMode: "contain",
          marginTop: 50,
          marginBottom: 20,
        }}
      />
      <AppText style={defaultStyles.typography.h2}>Enter OTP</AppText>
      <AppSpaceComponent height={30} />
      <View style={styles.formContainer}>
        <AppInputField
          onValueChange={onChangeCode}
          label="OTP"
          keyboardType="number-pad"
          maxLength={6}
          returnKeyType="done"
        />
      </View>
      <View style={{ bottom: 20 }}>
        <AppButtonWithShadow onPress={confirmCode}>
          <AppText
            style={{
              color: defaultStyles.Colors.white,
              fontWeight: "bold",
              marginRight: 8,
            }}
          >
            Sign Up
          </AppText>
        </AppButtonWithShadow>
      </View>
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
  formContainer: {
    padding: 8,
    flex: 1,
    width: 350,
    backgroundColor: defaultStyles.Colors.primaeryGrey,
  },
  underlineStyleBase: {
    width: 30,
    height: 45,
    borderWidth: 2,
    // borderWidth: 1,
    borderColor: defaultStyles.Colors.grey500,
    color: defaultStyles.Colors.grey700,
    borderRadius: 5,
  },

  underlineStyleHighLighted: {
    borderColor: defaultStyles.Colors.black,
  },
});
