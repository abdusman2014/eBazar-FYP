import { TextStyle } from "react-native";
import Colors from "./Colors";

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
