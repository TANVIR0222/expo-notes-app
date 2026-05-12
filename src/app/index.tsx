import { useTheme } from "@/hook/useTheme";
import { getStyles } from "@/styles/splash-screen-styles";
import { router } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { ActivityIndicator, Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

SplashScreen.preventAutoHideAsync();

export default function Splash() {
  const [ready, setReady] = useState(false);

  const { isDark } = useTheme();
  const styles = getStyles(isDark);

  useEffect(() => {
    const timer = setTimeout(() => {
      setReady(true);
    }, 9000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const prepare = async () => {
      if (ready) {
        await SplashScreen.hideAsync();

        router.replace("/notes-feature");
      }
    };

    prepare();
  }, [ready, router]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Image
          source={
            isDark
              ? require("@/assets/splash-image/splash-icon-dark.webp")
              : require("@/assets/splash-image/splash-icon-light.webp")
          }
          style={styles.illustration}
          resizeMode="contain"
        />

        <Text style={styles.title}>Great Things Start Here </Text>

        <Text style={styles.subtitle}>
          Every big idea starts with a small note.{"\n"}
          Capture your thoughts before they disappear.
        </Text>

        <View style={styles.loaderWrapper}>
          <ActivityIndicator
            size="large"
            color={isDark ? "#4DA3FF" : "#208AEF"}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
