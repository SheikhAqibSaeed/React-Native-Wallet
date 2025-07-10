import SafeScreen from "@/components/safeScreen";
import { ClerkProvider } from "@clerk/clerk-expo";
import { Slot, Stack } from "expo-router";
import { tokenCache } from '@clerk/clerk-expo/token-cache'
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
  // <SafeScreen>
  //   <Stack screenOptions={{headerShown: false}}/>
  // </SafeScreen>
  <ClerkProvider tokenCache={tokenCache}>
    <SafeScreen>
      <Slot />
    </SafeScreen>
    <StatusBar style="dark"/>
    </ClerkProvider>
  );
}
