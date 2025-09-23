import React from "react";
import { ScreenLayout } from "../components/design/ScreenLayout";
import { Button } from "../components/design/Button";
import { View, Text } from "react-native";
import { useAuth } from "@middleware/auth";
import { useRouter } from "expo-router";

export default function HomePage() {
  const { user, signOut } = useAuth();
  const router = useRouter();



  return (
    <ScreenLayout>
      <View className="flex-1 justify-center items-center px-6">
        <View className="w-full max-w-sm space-y-6 text-center">
          <Text className="text-2xl font-bold text-gray-900 mb-4">
            Welcome to Form Checker
          </Text>
          <Text className="text-gray-600 mb-6">
            You are logged in as: {user?.email}
          </Text>
          <View className="space-y-3">
            <Button
              title="Record Videos"
              onPress={() => router.push("/record")}
            />
            <Button
              title="My Videos"
              onPress={() => router.push("/videos")}
              variant="outline"
            />
            <Button title="Sign Out" onPress={signOut} variant="outline" />
          </View>
        </View>
      </View>
    </ScreenLayout>
  );
}
