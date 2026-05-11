import { Fonts } from "@/constants/fonts";
import FontSizes from "@/constants/fontSizes";
import { StyleSheet } from "react-native";

export const getStyles = (isDark: boolean | undefined) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDark ? "#000" : "#FFFFFF",
    },

    content: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 30,
    },

    illustration: {
      width: 260,
      height: 260,
      marginBottom: 70,
    },

    title: {
      fontSize: FontSizes.h1,
      color: isDark ? "#fff" : "#111",
      textAlign: "center",
      marginBottom: 10,
      fontFamily: Fonts.bold,
    },

    subtitle: {
      fontSize: FontSizes.body,
      fontFamily: Fonts.regular,
      color: isDark ? "#aaa" : "#7A7A7A",
      textAlign: "center",
      lineHeight: 22,
      marginBottom: 30,
    },

    loaderWrapper: {
      position: "absolute",
      bottom: 30,
      alignItems: "center",
    },
  });
