import React from "react";
import { View } from "react-native";

function AppSpaceComponent({height}) {
  return (
    <View
      style={{
        height: (height) ? height : 20,
      }}
    ></View>
  );
}

export default AppSpaceComponent;
