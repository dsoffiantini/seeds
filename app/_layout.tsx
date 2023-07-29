import { useFonts } from "expo-font";
import { Slot } from "expo-router";
import { StatusBar, View, useColorScheme } from "react-native";
import { TamaguiProvider, Theme } from "tamagui";
import config from "../tamagui.config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function Layout() {
  const colorScheme = useColorScheme();

  const [loaded] = useFonts({
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <View style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <TamaguiProvider config={config}>
          <Theme name={colorScheme === "dark" ? "dark" : "light"}>
            <StatusBar barStyle="dark-content" hidden />
            <Slot />
          </Theme>
        </TamaguiProvider>
      </QueryClientProvider>
    </View>
  );
}

export default Layout;
