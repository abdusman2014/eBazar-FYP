import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  Image,
  Button,
  View,
  Alert,
} from "react-native";
import AppText from "../../Components/AppText";
import { useForm, FormProvider, SubmitErrorHandler } from "react-hook-form";

import routes from "../../Navigation/routes";
import useAuth from "../../auth/useAuth";

import firebase from "../../../firebase";
import defaultStyles from "../../Config/styles";
import InputField from "../../Components/Auth/InputField";
import Validator from "../../Config/Validator";
import AppSearch from "../../Components/AppSearch";
import AppInputField from "../../Components/AppInputField";
import AppButtonWithShadow from "../../Components/AppButtonWithShadow";
import AppSpaceComponent from "../../Components/AppSpaceComponent";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import Lottie from "lottie-react-native";
type FormData = {
  name: string;
  email: string;
  password: string;
};

export default function SignInScreen(props) {
  const recaptchaVerifier = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const auth = useAuth();
  console.log("**", auth.user);

  const sendVerification = () => {
    //onChangephoneNoText("+92" + phoneNoText);
    const phoneNo = "+92" + phoneNoText;
    const phoneProvider = new firebase.auth.PhoneAuthProvider();
    phoneProvider
      .verifyPhoneNumber(phoneNo, recaptchaVerifier.current!)
      .then((val) => {
        // setVerificationId(val);
        console.log("code: ", val);
        props.setVerificationId(val);
        props.navigation.replace(routes.OTP_SCREEN);
      })
      .catch((e) => {
        console.log(phoneNo);
      });
  };
  useEffect(() => {
    auth.getLogedInUsser().then((user) => {
      setIsLoading(false);
      console.log(user);
      if (user !== null) {
        props.navigation.replace(routes.APP_NAVIGATION);
      }
    });
  }, []);

  const [phoneNoText, onChangephoneNoText] = React.useState("1234567890");
  const [passwordText, onChangepasswordText] = React.useState("");
  const [otpCode, onChangeOtpCode] = React.useState("");
  const [verificationId, setVerificationId] = useState("");
  function clickEventListener() {
    //addCartItem(item);
    //Alert.alert("Success", nameText + ", " + phoneNoText + ", " + passwordText);
  }

  const onSubmit = (data: FormData) => {
    Alert.alert("data", JSON.stringify(data));
  };
  const onError: SubmitErrorHandler<FormData> = (errors, e) => {
    return console.log({ errors });
  };
  if (isLoading) {
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
    <SafeAreaView style={styles.container}>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebase.app().options}
      />
      <Image
        source={require("../../assets/images/logo.png")}
        style={{
          width: 130,
          height: 130,
          borderRadius: 60,
          //resizeMode: "contain",
          marginTop: 50,
          marginBottom: 20,
          overflow: "hidden",
        }}
      />
      <AppText style={defaultStyles.typography.h2}>Welcome to E-Bazar</AppText>
      <AppSpaceComponent height={30} />
      <View style={styles.formContainer}>
        {/* <AppInputField onValueChange={onChangeNameText} label="Name" /> */}
        <View
          style={{
            marginRight: 8,
            borderWidth: 1,
            height: 40,
            borderColor: defaultStyles.Colors.black,
            borderRadius: 5,
            padding: 8,
          }}
        >
          <AppText
            style={{ color: defaultStyles.Colors.grey700, fontSize: 16 }}
          >
            +92
          </AppText>
        </View>
        <AppInputField
          onValueChange={onChangephoneNoText}
          label="Phone No"
          keyboardType="number-pad"
          maxLength={10}
          returnKeyType="done"
        />
        {/* <AppInputField
          onValueChange={onChangepasswordText}
          label="password"
          secureTextEntry={true}
        /> */}
      </View>
      <View style={{ bottom: 20 }}>
        <AppButtonWithShadow onPress={sendVerification}>
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
    flexDirection: "row",
  },
});
