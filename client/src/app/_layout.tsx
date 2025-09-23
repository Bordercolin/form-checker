import { Stack } from "expo-router";
import "../../global.css";
import { AuthProvider, useAuth } from "@middleware/auth";
import { LoadingScreen } from "@components/design/LoadingScreen";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function RootLayoutNav() {
  const { loading } = useAuth();

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="record" options={{ headerShown: false }} />
      <Stack.Screen name="videos" options={{ headerShown: false }} />
    </Stack>
  );
}
export default function RootLayout() {
  const queryClient = new QueryClient();
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <RootLayoutNav />
        </QueryClientProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
