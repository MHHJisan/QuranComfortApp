import React, { useState, useEffect, useCallback } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { Provider as PaperProvider, DefaultTheme } from "react-native-paper";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import { Amiri_400Regular, Amiri_700Bold } from "@expo-google-fonts/amiri";
import HomeScreen from "./screens/HomeScreen";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync({
          AmiriRegular: Amiri_400Regular,
          AmiriBold: Amiri_700Bold,
        });
        setFontsLoaded(true);
        await new Promise((resolve) => setTimeout(resolve, 500));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#2e7d32" />
      </View>
    );
  }

  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: "#2e7d32",
      accent: "#ff9800",
      background: "#f5f5f5",
      surface: "#ffffff",
      text: "#212121",
      emotions: {
        happy: "#43A047",
        forgiveness: "#7B1FA2",
        anxious: "#FB8C00",
        lonely: "#1976D2",
        comfort: "#0097A7",
        angry: "#D32F2F",
        motivational: "#FDD835",
        sad: "#455A64",
        thankful: "#7CB342",
        halalrizq: "#5D4037",
      },
    },
    fonts: {
      ...DefaultTheme.fonts,
      regular: {
        ...DefaultTheme.fonts.regular,
        fontFamily: "AmiriRegular",
      },
    },
  };

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <PaperProvider theme={theme}>
        <HomeScreen />
      </PaperProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
});
