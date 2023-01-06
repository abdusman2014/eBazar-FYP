import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Button,
  Image,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { MaterialIcons } from "@expo/vector-icons";
// import DatePicker from 'react-native-datepicker';


import defaultStyles from "../../Config/styles";
import AppSpaceComponent from "../../Components/AppSpaceComponent";
import AppInputField from "../../Components/AppInputField";
import AppGenderComponent from "../../Components/Auth/AppGenderComponent";
import AppButtonWithShadow from "../../Components/AppButtonWithShadow";
import AppText from "../../Components/AppText";

export default function UserProfileInputScreen() {
  const [image, setImage] = useState(null);
  const [nameText, onChangeNameText] = useState(null);
  const [emailText, onChangeEmailText] = useState(null);
  const [gender,onChangeGender] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

   // console.log(result);

    if (!result.canceled) {
      setImage(result.uri);
    }
  };

  const handlePressOnContinue = ()=>{};

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
      <View style={{  width: "100%", padding: 16 }}>
        <AppInputField onValueChange={onChangeNameText} label="Name" />
        <AppSpaceComponent height={60} />
        <AppInputField onValueChange={onChangeEmailText} label="Email" />
        <AppSpaceComponent height={60} />
       <AppGenderComponent gender={gender} onChangeGender={onChangeGender}/>
        
      </View>
      <View style={{ bottom: 50, padding: 8,position: 'absolute' }}>
        <AppButtonWithShadow onPress={handlePressOnContinue}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              width: "100%",
              justifyContent: "center",
            }}
          >
            <AppText
              style={{ color: "white", fontWeight: "bold", marginRight: 8 }}
            >
              Continue
            </AppText>
          </View>
        </AppButtonWithShadow>
      </View>
    </SafeAreaView>
  );
}

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
