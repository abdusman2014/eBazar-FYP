import { Alert, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import Lottie from "lottie-react-native";

import AppText from "../Components/AppText";
import defaultStyles from "../Config/styles";
import AppButtonWithShadow from "../Components/AppButtonWithShadow";
import AppSpaceComponent from "../Components/AppSpaceComponent";
import AppInputField from "../Components/AppInputField";
import userStore from "../state-management/AppUser";
import Address from "../Model/Address";
import firebase from "../../firebase";
import routes from "../Navigation/routes";

export default function AddAddressScreen(props) {
  const [isLoading, setIsLoading] = useState(false);
  const { addAddressToUser, user } = userStore();
  const onPressAddAddress = (values) => {
    setIsLoading(true);
    console.log(values);
    const address: Address = {
      title: values.title,
      description: values.description,
      addressId: user?.addresses.length!,
    };
    addAddressToUser(address);
    firebase
      .firestore()
      .collection("Users")
      .doc(user?.uid)
      .update({
        addresses: user?.addresses,
      })
      .then(() => {
        console.log("User updated!");
        setIsLoading(false);
        Alert.alert("Success", "Address added successfully", [
          {
            text: "OK",
            onPress: () => {
              props.navigation.navigate({
                name: routes.ADDRESS_SCREEN,

                merge: true,
              });
              console.log("OK Pressed");
            },
          },
        ]);
      });
  };
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
    <View style={styles.container}>
      <AppText style={defaultStyles.typography.h2}>Add Address</AppText>
      <Formik
        validationSchema={formValidationSchema}
        initialValues={{
          title: "",
          description: "",
        }}
        onSubmit={onPressAddAddress}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
          <View style={{ flex: 1, width: "100%", padding: 16 }}>
            <View>
              <AppInputField
                onValueChange={handleChange("title")}
                onBlur={handleBlur("title")}
                value={values.title}
                label="Add title e.g. Home"
              />
              <AppSpaceComponent height={errors.title ? 35 : 50} />
              {errors.title && (
                <AppText style={{ marginLeft: 8, fontSize: 12, color: "red" }}>
                  {errors.title}
                </AppText>
              )}
              <AppInputField
                onValueChange={handleChange("description")}
                onBlur={handleBlur("description")}
                value={values.description}
                label="Add adddress e.g. House#668, Street#21 I10/4"
              />
              <AppSpaceComponent height={errors.description ? 35 : 50} />
              {errors.description && (
                <AppText style={{ marginLeft: 8, fontSize: 12, color: "red" }}>
                  {errors.description}
                </AppText>
              )}
            </View>
            <View
              style={{
                bottom: 10,
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
    </View>
  );
}

const formValidationSchema = yup.object().shape({
  title: yup.string().required("Address title is Required"),
  description: yup.string().required("Address dexcription is Required"),
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
  },
});
