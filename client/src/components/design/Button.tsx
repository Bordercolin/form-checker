import React from "react";
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from "react-native";

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = "primary",
  size = "medium",
  disabled = false,
  loading = false,
  fullWidth = false,
  style,
  textStyle,
  icon,
  iconPosition = "left",
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case "primary":
        return "bg-primary";
      case "secondary":
        return "bg-secondary-200";
      case "outline":
        return "bg-transparent border border-primary";
      case "ghost":
        return "bg-transparent";
      default:
        return "bg-primary";
    }
  };

  const getTextColor = () => {
    switch (variant) {
      case "primary":
        return "text-background";
      case "secondary":
        return "text-secondary-800";
      case "outline":
        return "text-primary";
      case "ghost":
        return "text-primary";
      default:
        return "text-background";
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case "small":
        return "px-3 py-2";
      case "medium":
        return "px-4 py-3";
      case "large":
        return "px-6 py-4";
      default:
        return "px-4 py-3";
    }
  };

  const getTextSize = () => {
    switch (size) {
      case "small":
        return "text-sm";
      case "medium":
        return "text-base";
      case "large":
        return "text-lg";
      default:
        return "text-base";
    }
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      className={`
        rounded-lg items-center justify-center flex-row
        ${getVariantClasses()}
        ${getSizeClasses()}
        ${fullWidth ? "w-full" : ""}
        ${disabled ? "opacity-50" : "active:opacity-80"}
      `}
      style={style}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator
          color={
            variant === "outline" || variant === "ghost" ? "#0B80F2" : "#ffffff"
          }
          size="small"
        />
      ) : (
        <>
          {icon && iconPosition === "left" && (
            <Text className="mr-2">{icon}</Text>
          )}
          <Text
            className={`font-semibold ${getTextSize()} ${getTextColor()}`}
            style={textStyle}
          >
            {title}
          </Text>
          {icon && iconPosition === "right" && (
            <Text className="ml-2">{icon}</Text>
          )}
        </>
      )}
    </TouchableOpacity>
  );
};
