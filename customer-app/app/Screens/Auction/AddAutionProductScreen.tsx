import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";
import defaultStyles from "../../Config/styles";
import socket from "../../Config/AuctionSocket";
import userStore from "../../state-management/AppUser";
import AppButtonWithShadow from "../../Components/AppButtonWithShadow";
import AppText from "../../Components/AppText";
import AppSpaceComponent from "../../Components/AppSpaceComponent";
import AppInputField from "../../Components/AppInputField";
import { Formik } from "formik";
import * as yup from "yup";
export default function AddAutionProductScreen(props) {

  const { user } = userStore();
  const [userId, setUserId] = useState(user?.uid);

  const addProduct = (values) => {
  //  console.log(values);
   
      const url = values.imgUrl;
      const price = values.price;
      const name = values.name;
      const description = values.description;
      socket.emit("addProduct", { name, price, url,description, userId });
      props.navigation.goBack();
    
  };

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
        {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
          <View style={{ flex: 1, width: "100%", padding: 16 }}>
            <View>
              <AppInputField
                onValueChange={handleChange("name")}
                onBlur={handleBlur("title")}
                value={values.name}
                label="Product Name"
              />
              <AppSpaceComponent height={errors.name ? 35 : 50} />
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
              <AppSpaceComponent height={errors.description ? 35 : 50} />
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
              <AppSpaceComponent height={errors.price ? 35 : 50} />
              {errors.price && (
                <AppText style={{ marginLeft: 8, fontSize: 12, color: "red" }}>
                  {errors.price}
                </AppText>
              )}
              <AppInputField
                onValueChange={handleChange("imgUrl")}
                onBlur={handleBlur("imgUrl")}
                value={values.imgUrl}
                label="Image Url"
              />
              <AppSpaceComponent height={errors.imgUrl ? 35 : 50} />
              {errors.imgUrl && (
                <AppText style={{ marginLeft: 8, fontSize: 12, color: "red" }}>
                  {errors.imgUrl}
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

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: defaultStyles.Colors.primaeryGrey,
    //justifyContent: "center",
    alignItems: "center",
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
});
