import { Stack } from "expo-router";
import "../../global.css";
import { AuthProvider, useAuth } from "@middleware/auth";
import { LoadingScreen } from "@components/design/LoadingScreen";

function RootLayoutNav() {
  const { loading } = useAuth();

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootLayoutNav />
    </AuthProvider>
  );
}
