import { createStackNavigator } from "@react-navigation/stack";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import routes from "./routes";
import AppText from "../components/AppText";
import defaultStyles from "../Config/styles";
import CartsScreen from "../Screens/CartsScreen";
import HomeScreen from "../Screens/HomeScreen";
import ItemDetailsScreen from "../Screens/ItemDetailsScreen";
import Item from "../Model/Item";
import { useEffect } from "react";
import SignInScreen from "../Screens/Auth/SignInScreen";
import OtpScreen from "../Screens/Auth/OtpScreen";
import { AppNavigator } from "./AppNavigator";
import UserProfileInputScreen from "../Screens/Auth/UserProfileInputScreen";

function AuthNavigator() {
  const [verificationId, setVerificationId] = useState(null);
  const AuthNavigator = createStackNavigator();

  return (
    <AuthNavigator.Navigator  screenOptions={{
      headerShown: false
    }}>
      <AuthNavigator.Screen
        name={routes.SIGN_SCREEN}
        options={{
          headerStyle: {
            backgroundColor: defaultStyles.Colors.grey100,
          },

          headerShadowVisible: false,
          headerShown: false,
        }}
      >
        {(props) => (
          <SignInScreen {...props} setVerificationId={setVerificationId} />
        )}
      </AuthNavigator.Screen>
      <AuthNavigator.Screen
        name={routes.OTP_SCREEN}
        options={{
          headerTitle: "OTP", //item !== null ? item.name : "",
          headerBackImage(props) {
            return (
              <Ionicons
                name="arrow-back"
                size={24}
                color={defaultStyles.Colors.black}
                style={{ margin: 6 }}
              />
            );
          },

          headerBackTitleVisible: false,
        }}
      >
        {(props) => <OtpScreen {...props} verificationId={verificationId} />}
      </AuthNavigator.Screen>
      <AuthNavigator.Screen
        name={routes.USER_PROFILE_INPUT_SCREEN}
        options={{
          headerTitle: "Fill Your Profile", //item !== null ? item.name : "",
          headerBackImage(props) {
            return (
              <Ionicons
                name="arrow-back"
                size={24}
                color={defaultStyles.Colors.black}
                style={{ margin: 6 }}
              />
            );
          },

          headerBackTitleVisible: false,
        }}
      >
        {(props) => <UserProfileInputScreen {...props}  />}
      </AuthNavigator.Screen>
      <AuthNavigator.Screen
        name={routes.APP_NAVIGATION}
        options={{
          headerTitle: "", //item !== null ? item.name : "",
          headerBackImage(props) {
            return (
              <Ionicons
                name="arrow-back"
                size={24}
                color={defaultStyles.Colors.black}
                style={{ margin: 6 }}
              />
            );
          },
          
          headerBackTitleVisible: false,
        }}
      >
        {(props) => <AppNavigator />}
      </AuthNavigator.Screen>
    </AuthNavigator.Navigator>
  );
}

export default AuthNavigator;
