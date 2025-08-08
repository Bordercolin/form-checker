import React from "react";
import { ScreenLayout } from "../components/design/ScreenLayout";
import { Button } from "../components/design/Button";
import { View, Text } from "react-native";
import { useAuth } from "@middleware/auth";

export default function HomePage() {
  const { user, signOut } = useAuth();

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
          <Button title="Sign Out" onPress={signOut} variant="outline" />
        </View>
      </View>
    </ScreenLayout>
  );
}
