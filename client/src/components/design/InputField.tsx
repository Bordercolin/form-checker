import React, { useState } from "react";
import {
  TextInput,
  Text,
  View,
  TouchableOpacity,
  TextInputProps,
  ViewStyle,
  TextStyle,
} from "react-native";

interface InputFieldProps extends TextInputProps {
  label?: string;
  error?: string;
  variant?: "default" | "outline" | "filled";
  size?: "small" | "medium" | "large";
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onRightIconPress?: () => void;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  labelStyle?: TextStyle;
  errorStyle?: TextStyle;
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  error,
  variant = "default",
  size = "medium",
  fullWidth = false,
  leftIcon,
  rightIcon,
  onRightIconPress,
  containerStyle,
  inputStyle,
  labelStyle,
  errorStyle,
  ...textInputProps
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const getVariantClasses = () => {
    switch (variant) {
      case "default":
        return "bg-background border border-gray-300";
      case "outline":
        return "bg-transparent border border-primary";
      case "filled":
        return "bg-secondary border border-transparent";
      default:
        return "bg-background border border-gray-300";
    }
  };

  const getFocusClasses = () => {
    if (isFocused) {
      switch (variant) {
        case "default":
          return "border-primary";
        case "outline":
          return "border-primary";
        case "filled":
          return "border-primary";
        default:
          return "border-primary";
      }
    }
    return "";
  };

  const getErrorClasses = () => {
    if (error) {
      return "border-error";
    }
    return "";
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

  const getLabelSize = () => {
    switch (size) {
      case "small":
        return "text-xs";
      case "medium":
        return "text-sm";
      case "large":
        return "text-base";
      default:
        return "text-sm";
    }
  };

  return (
    <View className={`${fullWidth ? "w-full" : ""}`} style={containerStyle}>
      {label && (
        <Text
          className={`font-medium text-gray-700 mb-2 ${getLabelSize()}`}
          style={labelStyle}
        >
          {label}
        </Text>
      )}

      <View
        className={`
          flex-row items-center rounded-lg
          ${getVariantClasses()}
          ${getFocusClasses()}
          ${getErrorClasses()}
          ${getSizeClasses()}
        `}
      >
        {leftIcon && <View className="mr-3">{leftIcon}</View>}

        <TextInput
          className={`
            flex-1 text-gray-900
            ${getTextSize()}
          `}
          placeholderTextColor="#9CA3AF"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={inputStyle}
          {...textInputProps}
        />

        {rightIcon && (
          <TouchableOpacity
            onPress={onRightIconPress}
            disabled={!onRightIconPress}
            className="ml-3"
            activeOpacity={onRightIconPress ? 0.7 : 1}
          >
            {rightIcon}
          </TouchableOpacity>
        )}
      </View>

      {error && (
        <Text
          className={`text-error text-xs mt-1 ${getLabelSize()}`}
          style={errorStyle}
        >
          {error}
        </Text>
      )}
    </View>
  );
};
