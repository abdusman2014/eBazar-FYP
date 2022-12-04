import React, { useRef, useState } from "react";
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

import firebase from "../../../firebase";
import defaultStyles from "../../Config/styles";
import InputField from "../../Components/Auth/InputField";
import Validator from "../../Config/Validator";
import AppSearch from "../../Components/AppSearch";
import AppInputField from "../../Components/AppInputField";
import AppButtonWithShadow from "../../Components/AppButtonWithShadow";
import AppSpaceComponent from "../../Components/AppSpaceComponent";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";

type FormData = {
  name: string;
  email: string;
  password: string;
};

export default function SignInScreen(props) {
  const recaptchaVerifier = useRef(null);
  //console.log('**',firebase);
  const sendVerification = () => {
    const phoneProvider = new firebase.auth.PhoneAuthProvider();
    phoneProvider
      .verifyPhoneNumber(phoneNoText, recaptchaVerifier.current!)
      .then((val) => {
        // setVerificationId(val);
        console.log("code: ", val);
        props.setVerificationId(val);
        props.navigation.navigate(routes.OTP_SCREEN);
      });
  };

  const [nameText, onChangeNameText] = React.useState("");
  const [phoneNoText, onChangephoneNoText] = React.useState("+12345678910");
  const [passwordText, onChangepasswordText] = React.useState("");
  const [otpCode, onChangeOtpCode] = React.useState("");
  const [verificationId, setVerificationId] = useState("");
  function clickEventListener() {
    //addCartItem(item);
    Alert.alert("Success", nameText + ", " + phoneNoText + ", " + passwordText);
  }

  const onSubmit = (data: FormData) => {
    Alert.alert("data", JSON.stringify(data));
  };
  const onError: SubmitErrorHandler<FormData> = (errors, e) => {
    return console.log({ errors });
  };
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
          borderRadius: 20,
          resizeMode: "contain",
          marginTop: 50,
          marginBottom: 20,
        }}
      />
      <AppText style={defaultStyles.typography.h2}>Create Your Account</AppText>
      <AppSpaceComponent height={30} />
      <View style={styles.formContainer}>
        <AppInputField onValueChange={onChangeNameText} label="Name" />
        <AppInputField onValueChange={onChangephoneNoText} label="Phone No" />
        <AppInputField
          onValueChange={onChangepasswordText}
          label="password"
          secureTextEntry={true}
        />
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
  },
});
