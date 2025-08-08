import React from "react";
import { View, ScrollView, StatusBar, Platform } from "react-native";

interface ScreenLayoutProps {
  children: React.ReactNode;
  backgroundColor?: string;
  scrollable?: boolean;
  padding?: number;
}

export const ScreenLayout: React.FC<ScreenLayoutProps> = ({
  children,
  backgroundColor = "bg-background",
  scrollable = true,
  padding = 16,
}) => {
  const Content = scrollable ? ScrollView : View;

  return (
    <View className={`flex-1 ${backgroundColor}`}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#ffffff"
        translucent={false}
      />
      <View
        className="flex-1"
        style={{
          paddingTop:
            Platform.OS === "android" ? StatusBar.currentHeight || 0 : 0,
        }}
      >
        <Content
          className="flex-1"
          contentContainerStyle={{ padding }}
          showsVerticalScrollIndicator={false}
        >
          {children}
        </Content>
      </View>
    </View>
  );
};
