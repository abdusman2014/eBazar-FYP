import { TextStyle } from "react-native";
import Colors from "./Colors";


export const fontAssets = {
  "Montserrat-Black": require("../assets/fonts/montserrat/Montserrat-Black.ttf"),
  "Montserrat-Bold": require("../assets/fonts/montserrat/Montserrat-Bold.ttf"),
  "Montserrat-Light": require("../assets/fonts/montserrat/Montserrat-Light.ttf"),
  "Montserrat-Medium": require("../assets/fonts/montserrat/Montserrat-Medium.ttf"),
  "Montserrat-Regular": require("../assets/fonts/montserrat/Montserrat-Regular.ttf"),
  "Montserrat-SemiBold": require("../assets/fonts/montserrat/Montserrat-SemiBold.ttf"),
  "Montserrat-Thin": require("../assets/fonts/montserrat/Montserrat-Thin.ttf"),
  "OpenSans-Bold": require("../assets/fonts/opensans/OpenSans-Bold.ttf"),
  "OpenSans-ExtraBold": require("../assets/fonts/opensans/OpenSans-ExtraBold.ttf"),
  "OpenSans-Italic": require("../assets/fonts/opensans/OpenSans-Italic.ttf"),
  "OpenSans-Light": require("../assets/fonts/opensans/OpenSans-Light.ttf"),
  "OpenSans-Regular": require("../assets/fonts/opensans/OpenSans-Regular.ttf"),
  "OpenSans-SemiBold": require("../assets/fonts/opensans/OpenSans-SemiBold.ttf"),
};

const fontFamily = {
  montserrat: {
    black: "Montserrat-Black",
    bold: "Montserrat-Bold",
    light: "Montserrat-Light",
    medium: "Montserrat-Medium",
    regular: "Montserrat-Regular",
    semibold: "Montserrat-SemiBold",
    thin: "Montserrat-Thin",
  },
  opensans: {
    bold: "OpenSans-Bold",
    extrabold: "OpenSans-ExtraBold",
    italic: "OpenSans-Italic",
    light: "OpenSans-Light",
    regular: "OpenSans-Regular",
    semibold: "OpenSans-SemiBold",
  },
};

export default {
  Colors,

  primary: {
    color: Colors.primary,
  },
  typography: {
    h1: {
      fontSize: 36,
      lineHeight: 48,
      fontFamily: fontFamily.montserrat.black,
    } as TextStyle,
    h2: {
      fontSize: 24,
      lineHeight: 32,
      fontFamily: fontFamily.montserrat.bold,
    } as TextStyle,
    h3: {
      fontSize: 18,
      lineHeight: 24,
      fontFamily: fontFamily.montserrat.bold,
    } as TextStyle,
    h4: {
      fontSize: 16,
      lineHeight: 24,
      fontFamily: fontFamily.montserrat.semibold,
    } as TextStyle,
    body: {
      sm: {
        regular: {
          fontSize: 12,
          lineHeight: 18,
          fontFamily: fontFamily.opensans.regular,
        } as TextStyle,
        bold: {
          fontSize: 12,
          lineHeight: 18,
          fontFamily: fontFamily.opensans.bold,
        } as TextStyle,
      },
      md: {
        semiBold: {
          fontSize: 14,
          //lineHeight: 20,
          fontFamily: fontFamily.opensans.semibold,
        } as TextStyle,
        regular: {
          fontSize: 14,
          //lineHeight: 20,

          fontFamily: fontFamily.opensans.regular,
        } as TextStyle,
      },
      large: {
        regular: {
          fontSize: 16,
         // lineHeight: 28,
          fontFamily: fontFamily.opensans.regular,
        },
        bold: {
          fontSize: 16,
         // lineHeight: 28,
          fontWeight: "bold",
          fontFamily: fontFamily.opensans.bold,
        },
      },
    },
    labels: {
      xs: {
        semiboldCaps: {
          fontSize: 11,
          lineHeight: 16,
          fontFamily: fontFamily.opensans.semibold,
        } as TextStyle,
      },
      large: {
        regular: {
          fontSize: 16,
          lineHeight: 24,
          fontFamily: fontFamily.opensans.regular,
        } as TextStyle,
        bold: {
          fontSize: 16,
          lineHeight: 24,
          fontFamily: fontFamily.opensans.bold,
        } as TextStyle,
      },
    },
  },
  helpers: {
    screenPaddingHorizontal: 16,
    screenPaddingVertical: 16,
  },
};
