import React, { createContext } from "react";
import { useColorScheme } from "react-native";
import IThemeContextInterface from "../interface/themeContext-interface";

export const ThemeContext = createContext<IThemeContextInterface | undefined>(
  undefined,
);

export const ThemeProvider = ({ children }: any) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <ThemeContext.Provider value={{ isDark, colorScheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
