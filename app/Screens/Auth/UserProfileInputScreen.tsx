import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Button,
  Image,
  Pressable,
  Alert,
} from "react-native";

import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { manipulateAsync, FlipType, SaveFormat } from "expo-image-manipulator";
import { MaterialIcons } from "@expo/vector-icons";
import { Formik } from "formik";
import * as yup from "yup";
// import ImgToBase64 from 'react-native-image-base64';
import * as FileSystem from "expo-file-system";
import Lottie from "lottie-react-native";

import firebase from "../../../firebase";
// import DatePicker from 'react-native-datepicker';

import defaultStyles from "../../Config/styles";
import AppSpaceComponent from "../../Components/AppSpaceComponent";
import AppInputField from "../../Components/AppInputField";
import AppGenderComponent from "../../Components/Auth/AppGenderComponent";
import AppButtonWithShadow from "../../Components/AppButtonWithShadow";
import AppText from "../../Components/AppText";
import userStore from "../../state-management/AppUser";
import User from "../../Model/User";
import Gender from "../../Model/Gender";
import routes from "../../Navigation/routes";
import Card from "../../Model/Card";

export default function UserProfileInputScreen(props) {
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [gender, onChangeGender] = useState(null);
  const { setUser } = userStore();
  var name;
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      const manipResult = await manipulateAsync(
        result.uri,
        [{ resize: { height: 500, width: 500 } }],
        { compress: 1, format: SaveFormat.JPEG }
      );
      console.log(manipResult);
      setImage(manipResult.uri);
      //setImage(result.uri);
    }
  };

  const handlePressOnContinue = async (values) => {
    console.log(values, gender);
    if (gender === null) {
      Alert.alert("Required", "Please select Gender.");
      return;
    }
    setIsLoading(true);
    let link = null;
    if (image !== null) {
      const base64 = await FileSystem.readAsStringAsync(image!, {
        encoding: "base64",
      });
      // .then(async (base64) => {
      var toUint8Array = require("base64-to-uint8array");
      var unit8Array = toUint8Array(base64);

      const reference = firebase.storage().ref("Users/" + user?.uid! + ".jpg");

      const task = await reference.put(unit8Array);

      link = await firebase
        .storage()
        .ref("Users/" + user?.uid! + ".jpg")
        .getDownloadURL();
    }
    const myUser: User = {
      name: values.firstName + " " + values.lastName,
      email: values.email,
      gender: gender === Gender.male ? "male" : "female",
      age: values.age,
      uid: props.user?.uid!,
      image: link,
      phoneNo: props.user?.phoneNo!,
      orders: [],
      addresses: [],
    };
    firebase
      .firestore()
      .collection("Users")
      .doc(props.user?.uid!)
      .set(myUser)
      .then(() => {
        const card: Card = {
          cardNo: Math.floor(Math.random()*1E16),
          ownername: values.firstName + " " + values.lastName,
          balance: 0,
          transactionHistory: [],
        };
        firebase
          .firestore()
          .collection("Users/" + props.user?.uid! + "/cards")
          .doc("e-wallet")
          .set(card)
          .then(() => {
            console.log("card added!");
            setUser(myUser);
            setIsLoading(false);
            props.navigation.replace(routes.APP_NAVIGATION);
          })
          .catch((e) => {
            console.log("error: ", e);
          });
        console.log("User added!");
        
      })
      .catch((e) => {
        console.log("error: ", e);
      });
  };
  if (isLoading) {
    return (
      <View style={{flex:1, alignItems: "center", justifyContent: "center" }}>
        <View style={{ height: 100 }} />
        <Lottie
          source={require("../../assets/progress.json")}
          autoPlay
          loop
          //style={{ height: 600, width: 600 }}
        />
      </View>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <AppSpaceComponent height={100} />

      <View style={styles.image}>
        {image ? (
          <Image
            source={{ uri: image }}
            style={{ width: 150, height: 150, borderRadius: 75 }}
          />
        ) : (
          <Image
            source={require("../../assets/images/user-profile.png")}
            style={{ width: 150, height: 150, borderRadius: 75 }}
          />
        )}
        <Pressable style={styles.imageBtn} onPress={pickImage}>
          <MaterialIcons
            name="edit"
            size={24}
            color={defaultStyles.Colors.white}
          />
        </Pressable>
      </View>
      <AppSpaceComponent height={40} />
      <Formik
        validationSchema={formValidationSchema}
        initialValues={{
          firstName: "",
          lastName: "",
          age: "",
          email: null,
        }}
        onSubmit={handlePressOnContinue}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
          <View style={{ flex: 1, width: "100%", padding: 16 }}>
            <View>
              <AppInputField
                onValueChange={handleChange("firstName")}
                onBlur={handleBlur("firstName")}
                value={values.firstName}
                label="First Name"
              />
              <AppSpaceComponent height={errors.firstName ? 35 : 50} />
              {errors.firstName && (
                <AppText style={{ marginLeft: 8, fontSize: 12, color: "red" }}>
                  {errors.firstName}
                </AppText>
              )}
              <AppInputField
                onValueChange={handleChange("lastName")}
                onBlur={handleBlur("lastName")}
                value={values.lastName}
                label="Last Name"
              />
              <AppSpaceComponent height={50} />
              <AppInputField
                onValueChange={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
                label="Email"
              />
              <AppSpaceComponent height={errors.email ? 35 : 50} />
              {errors.email && (
                <AppText style={{ marginLeft: 8, fontSize: 12, color: "red" }}>
                  {errors.email}
                </AppText>
              )}
              <AppInputField
                onValueChange={handleChange("age")}
                onBlur={handleBlur("age")}
                value={values.age}
                keyboardType="numeric"
                label="Age"
              />
              <AppSpaceComponent height={errors.age ? 35 : 50} />
              {errors.age && (
                <AppText style={{ marginLeft: 8, fontSize: 12, color: "red" }}>
                  {errors.age}
                </AppText>
              )}
              <AppSpaceComponent height={30} />
              <AppGenderComponent
                gender={gender}
                onChangeGender={onChangeGender}
              />
            </View>
            <View
              style={{
                bottom: 50,
                padding: 8,
                position: "absolute",
                flexDirection: "row",
              }}
            >
              <View style={{ flex: 1 }} />
              <View>
                <AppButtonWithShadow onPress={handleSubmit}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      width: "100%",
                      justifyContent: "center",
                    }}
                  >
                    <AppText
                      style={{
                        color: "white",
                        fontWeight: "bold",
                        marginRight: 8,
                      }}
                    >
                      Continue
                    </AppText>
                  </View>
                </AppButtonWithShadow>
              </View>
              <View style={{ flex: 1 }} />
            </View>
          </View>
        )}
      </Formik>
    </SafeAreaView>
  );
}

const formValidationSchema = yup.object().shape({
  firstName: yup.string().required("Name is Required"),
  email: yup.string().email("Not a proper Email").nullable(),
  age: yup.string().required("Age is Required"),
});

const styles = StyleSheet.create({
  container: {
    top: 32,

    flex: 1,
    backgroundColor: defaultStyles.Colors.primaeryGrey,
    //justifyContent: "center",
    alignItems: "center",
  },
  image: {
    //position: "absolute",
  },
  imageBtn: {
    backgroundColor: defaultStyles.Colors.black,
    // padding: 4,
    height: 40,
    width: 40,
    margintop: -30,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: -5,
    right: 5,
  },
});
