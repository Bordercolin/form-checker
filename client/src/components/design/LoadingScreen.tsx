import React from "react";
import { View, Text, ActivityIndicator } from "react-native";

export const LoadingScreen = () => {
  return (
    <View className="flex-1 justify-center items-center bg-background">
      <ActivityIndicator size="large" color="#0B80F2" />
      <Text className="text-gray-600 mt-4 text-lg">Loading...</Text>
    </View>
  );
};
