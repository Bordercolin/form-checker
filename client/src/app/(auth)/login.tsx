import React from "react";
import { ScreenLayout } from "@components/design/ScreenLayout";
import { LoginForm } from "@components/functional/forms/LoginForm";
import { View, Text, TouchableOpacity } from "react-native";
import { Link } from "expo-router";

export default function LoginScreen() {
  return (
    <ScreenLayout scrollable={false}>
      <View className="flex-1 justify-center items-center px-6">
        <View className="w-full max-w-sm space-y-6">
          <View className="text-center mb-8">
            <Text className="text-2xl font-bold text-gray-900 mb-2">
              Welcome Back
            </Text>
            <Text className="text-gray-600">
              Sign in to your account to continue
            </Text>
          </View>

          <LoginForm />

          <View className="text-center mt-6">
            <View className="flex-row justify-center items-center flex-wrap">
              <Text className="text-gray-600">Don't have an account? </Text>
              <Link href="/(auth)/register" asChild>
                <TouchableOpacity>
                  <Text className="text-primary font-semibold">
                    Sign up here
                  </Text>
                </TouchableOpacity>
              </Link>
            </View>
          </View>
        </View>
      </View>
    </ScreenLayout>
  );
}
