import SafeScreen from "@/components/safeScreen";
import { ClerkProvider } from "@clerk/clerk-expo";
import { Slot, Stack } from "expo-router";
import { tokenCache } from '@clerk/clerk-expo/token-cache'

export default function RootLayout() {
  return (
  // <SafeScreen>
  //   <Stack screenOptions={{headerShown: false}}/>
  // </SafeScreen>
  <ClerkProvider tokenCache={tokenCache}>
    <SafeScreen>
      <Slot />
    </SafeScreen>
    </ClerkProvider>
  );
}
