import React from "react";
import { ScreenLayout } from "@components/design/ScreenLayout";
import { RegisterForm } from "@components/functional/forms/RegisterForm";
import { View, Text, TouchableOpacity } from "react-native";
import { Link } from "expo-router";

export default function RegisterScreen() {
  return (
    <ScreenLayout scrollable={false}>
      <View className="flex-1 justify-center items-center px-6">
        <View className="w-full max-w-sm space-y-6">
          <View className="text-center mb-8">
            <Text className="text-2xl font-bold text-gray-900 mb-2">
              Create Account
            </Text>
            <Text className="text-gray-600">Sign up to get started</Text>
          </View>

          <RegisterForm />

          <View className="text-center mt-6">
            <View className="flex-row justify-center items-center flex-wrap">
              <Text className="text-gray-600">Already have an account? </Text>
              <Link href="/(auth)/login" asChild>
                <TouchableOpacity>
                  <Text className="text-primary font-semibold">
                    Sign in here
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
