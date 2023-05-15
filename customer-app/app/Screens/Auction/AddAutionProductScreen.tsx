import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  Platform,
} from "react-native";
import Lottie from "lottie-react-native";
import Checkbox from "expo-checkbox";
import React, { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import defaultStyles from "../../Config/styles";
import socket from "../../Config/AuctionSocket";
import userStore from "../../state-management/AppUser";
import AppButtonWithShadow from "../../Components/AppButtonWithShadow";
import AppText from "../../Components/AppText";
import AppSpaceComponent from "../../Components/AppSpaceComponent";
import AppInputField from "../../Components/AppInputField";
import { Formik } from "formik";
import * as yup from "yup";
import * as ImagePicker from "expo-image-picker";
import { manipulateAsync, SaveFormat } from "expo-image-manipulator";
import firebase from "firebase/compat";
export default function AddAutionProductScreen(props) {
  const { user } = userStore();
  const [userId, setUserId] = useState(user?.uid);
  const [image, setImage] = useState(null);
  const [userName, setUserName] = useState(user?.name);
  const [isReverseAuction, setIsReverAuction] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    // console.log(result);

    if (!result.canceled) {
      if (Platform.OS === "android") {
        const fileFormat = result.uri.split(".").pop();
        result["fileName"] =
          "IMG_" +
          Math.floor(Math.random() * (999 - 100 + 1) + 100) +
          "." +
          fileFormat;
      }
      // const manipResult = await manipulateAsync(
      //   result.uri,
      //   [{ resize: { height: 500, width: 500 } }],
      //   { compress: 1, format: SaveFormat.JPEG }
      // );
      // console.log(manipResult);
      console.log(result);
      setImage(result);
      //setImage(result.uri);
    }
  };
  const addProduct = async (values) => {
    console.log(values.imgUrl, isReverseAuction);
    setIsLoading(true);
    const uploadUrl = await uploadImageAsync(image.uri, image.fileName);
    console.log("image url: ", uploadUrl);

    const url = uploadUrl;
    const price = values.price;
    const name = values.name;
    const description = values.description;
    socket.emit("addProduct", {
      name,
      price,
      url,
      description,
      userId,
      userName,
      isReverseAuction,
      //uploadUrl,
    });
    props.navigation.goBack();
  };
  if (isLoading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
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
    <SafeAreaView style={styles.Container}>
      <Formik
        validationSchema={formValidationSchema}
        initialValues={{
          name: "",
          description: "",
          imgUrl: "",
          price: "",
        }}
        onSubmit={addProduct}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          setFieldValue,
        }) => (
          <View style={{ flex: 1, width: "100%", padding: 16 }}>
            <View>
              <AppInputField
                onValueChange={handleChange("name")}
                onBlur={handleBlur("title")}
                value={values.name}
                label="Product Name"
              />
              <AppSpaceComponent height={errors.name ? 5 : 15} />
              {errors.name && (
                <AppText style={{ marginLeft: 8, fontSize: 12, color: "red" }}>
                  {errors.name}
                </AppText>
              )}
              <AppInputField
                onValueChange={handleChange("description")}
                onBlur={handleBlur("description")}
                value={values.description}
                label="Product Description"
              />
              <AppSpaceComponent height={errors.description ? 5 : 15} />
              {errors.description && (
                <AppText style={{ marginLeft: 8, fontSize: 12, color: "red" }}>
                  {errors.description}
                </AppText>
              )}
              <AppInputField
                onValueChange={handleChange("price")}
                onBlur={handleBlur("price")}
                value={values.price}
                keyboardType="number-pad"
                label="Price"
              />
              <AppSpaceComponent height={errors.price ? 5 : 15} />
              {errors.price && (
                <AppText style={{ marginLeft: 8, fontSize: 12, color: "red" }}>
                  {errors.price}
                </AppText>
              )}
              {/* <AppInputField
                onValueChange={handleChange("imgUrl")}
                onBlur={handleBlur("imgUrl")}
                value={values.imgUrl}
                label="Image Url"
              /> */}
              <View style={styles.image}>
                {image ? (
                  <Image
                    source={{ uri: image.uri }}
                    style={{ width: 100, height: 100, borderRadius: 75 }}
                  />
                ) : (
                  <Image
                    source={require("../../assets/images/user-profile.png")}
                    style={{ width: 100, height: 100, borderRadius: 75 }}
                  />
                )}
                <Pressable
                  style={styles.imageBtn}
                  onPress={async () => {
                    await pickImage();
                    setFieldValue("imgUrl", "image.uri");
                  }}
                >
                  <MaterialIcons
                    name="edit"
                    size={24}
                    color={defaultStyles.Colors.white}
                  />
                </Pressable>
              </View>
              <AppSpaceComponent height={errors.imgUrl ? 5 : 15} />
              {errors.imgUrl && (
                <AppText style={{ marginLeft: 8, fontSize: 12, color: "red" }}>
                  {errors.imgUrl}
                </AppText>
              )}
            </View>
            <AppSpaceComponent height={30} />
            <FiltersComponent
              name={"Reverse Auction"}
              filterValue={isReverseAuction}
              onPress={(val) => {
                setIsReverAuction(val);
              }}
            />
            <View
              style={{
                bottom: 30,
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
                      //bottom: 1
                    }}
                  >
                    <AppText
                      style={{
                        color: "white",
                        fontWeight: "bold",
                        marginRight: 8,
                      }}
                    >
                      Add Product
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
  name: yup.string().required("Product Name is Required"),
  description: yup.string().required("Description is Required"),
  imgUrl: yup.string().required("Image URL is Required"),
  price: yup.string().required("Price is Required"),
});

const FiltersComponent = ({ name, filterValue, onPress }) => {
  const [value, setValue] = useState(filterValue);
  //  console.log(name, ', ', filterValue);

  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <Image
        source={require("../../assets/images/reverse-auction.png")}
        style={{ height: 30, width: 30, marginRight: 8 }}
      />
      <AppText style={defaultStyles.typography.h3}>{name}</AppText>
      <View style={{ flex: 1 }} />
      <Checkbox
        style={{ borderRadius: 4 }}
        //  size={24}
        value={value}
        onValueChange={(val) => {
          setValue(val);
          onPress(val);
        }}
      />
    </View>
  );
};

async function uploadImageAsync(uri, fileName) {
  // Why are we using XMLHttpRequest? See:
  console.log(fileName);
  // https://github.com/expo/expo/issues/2402#issuecomment-443726662
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function (e) {
      console.log(e);
      reject(new TypeError("Network request failed"));
    };
    xhr.responseType = "blob";
    xhr.open("GET", uri, true);
    xhr.send(null);
  });

  const ref = firebase
    .storage()
    .ref()
    .child("images/" + fileName);
  const snapshot = await ref.put(blob);

  // We're done with the blob, close and release it
  blob.close();

  return await snapshot.ref.getDownloadURL();
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: defaultStyles.Colors.primaeryGrey,
    //justifyContent: "center",
    alignItems: "center",
    top: 22,
  },
  productForm: {
    width: "100%",
    padding: 10,
  },
  formInput: {
    borderWidth: 1,
    padding: 15,
    marginTop: 5,
    marginBottom: 10,
  },
  addProductBtn: {
    backgroundColor: "green",
    padding: 15,
  },
  image: {
    //position: "absolute",
    height: 100,
    width: 100,
    //backgroundColor: 'red'
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
