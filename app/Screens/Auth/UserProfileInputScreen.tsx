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
import { MaterialIcons } from "@expo/vector-icons";
import { Formik } from "formik";
import * as yup from "yup";
import firestore from "@react-native-firebase/firestore";
import ImgToBase64 from 'react-native-image-base64';

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

export default function UserProfileInputScreen(props) {
  const [image, setImage] = useState(null);
  const [nameText, onChangeNameText] = useState(null);
  const [emailText, onChangeEmailText] = useState(null);
  const [gender, onChangeGender] = useState(null);
  const { setUser, user } = userStore();
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

     console.log(result);

    if (!result.canceled) {
      setImage(result.uri);
    }
  };

  const handlePressOnContinue =async (values) => {
    console.log(values, gender);
    if (gender === null) {
      Alert.alert("Required", "Please select Gender.");
      return;
    }
    const myUser: User = {
      name: values.name,
      email: values.email,
      gender: gender === Gender.male ? "male" : "female",
      age: values.age,
      uid: user?.uid!,
      image: "url",
    };
    console.log(image);
    ImgToBase64.getBase64String(image) // path to your image from local storage
    .then((base64String) => {
         // baseStringSample = base64String,
       //  console.log('img: ',base64String)
    //      var byteCharacters = atob(base64String);
    //      var byteNumbers = new Array(byteCharacters.length);
    //      let byteArray;
    //  for (var i = 0; i < byteCharacters.length; i++) {
    //      byteNumbers[i] = byteCharacters.charCodeAt(i);
    //      byteArray = new Uint8Array(byteNumbers);
    //      console.log("BYTEARRAY: " + byteArray);
    //  }
          })
    .catch(err => Alert.alert('Error' + err));
    const reference = firebase.storage().ref('black-t-shirt-sm.png');
    console.log(reference)
    await reference.put(image);
    // firebase.firestore()
    //   .collection("Users")
    //   .doc(user?.uid!)
    //   .set(myUser)
    //   .then(() => {
    //     console.log("User added!");
    //   })
    //   .catch((e) => {
    //     console.log("error: ", e);
    //   });
  };

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
          name: "",
          age: "",
          email: null,
        }}
        onSubmit={handlePressOnContinue}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
          <View style={{ flex: 1, width: "100%", padding: 16 }}>
            <View>
              <AppInputField
                onValueChange={handleChange("name")}
                onBlur={handleBlur("name")}
                value={values.name}
                label="Name"
              />
              <AppSpaceComponent height={errors.name ? 35 : 50} />
              {errors.name && (
                <AppText style={{ marginLeft: 8, fontSize: 12, color: "red" }}>
                  {errors.name}
                </AppText>
              )}
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

            <View style={{ bottom: 50, padding: 8, position: "absolute" }}>
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
          </View>
        )}
      </Formik>
    </SafeAreaView>
  );
}

const formValidationSchema = yup.object().shape({
  name: yup.string().required("Name is Required"),
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
