import { Button } from "@components/design/Button";
import { InputField } from "@components/design/InputField";
import React, { useState } from "react";
import { View, Text } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { supabase } from "@lib/supabase";

export const RegisterForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const [passwordError, setPasswordError] = useState("");

  const onSubmit = async (data: {
    email: string;
    password: string;
    confirmPassword: string;
  }) => {
    if (data.password !== data.confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");
    setPasswordError("");

    const { data: user, error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
    });

    if (error) {
      setError(error.message);
    } else {
      setSuccess(
        "Registration successful! Please check your email to verify your account."
      );
    }

    setLoading(false);
  };

  const password = watch("password");

  return (
    <View className="space-y-6">
      {error && (
        <View className="bg-red-50 border border-red-200 rounded-lg p-3">
          <Text className="text-red-600 text-sm">{error}</Text>
        </View>
      )}

      {success && (
        <View className="bg-green-50 border border-green-200 rounded-lg p-3">
          <Text className="text-green-600 text-sm">{success}</Text>
        </View>
      )}

      <Controller
        control={control}
        name="email"
        rules={{
          required: "Email is required",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "Please enter a valid email address",
          },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <InputField
            label="Email"
            placeholder="Enter your email"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            error={errors.email?.message}
            fullWidth
          />
        )}
      />

      <Controller
        control={control}
        name="password"
        rules={{
          required: "Password is required",
          minLength: {
            value: 6,
            message: "Password must be at least 6 characters",
          },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <InputField
            label="Password"
            placeholder="Enter your password"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            secureTextEntry
            error={errors.password?.message}
            fullWidth
          />
        )}
      />

      <Controller
        control={control}
        name="confirmPassword"
        rules={{
          required: "Please confirm your password",
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <InputField
            label="Confirm Password"
            placeholder="Confirm your password"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            secureTextEntry
            error={passwordError || errors.confirmPassword?.message}
            fullWidth
          />
        )}
      />

      <View className="mt-4">
        <Button
          title={loading ? "Creating account..." : "Register"}
          onPress={handleSubmit(onSubmit)}
          fullWidth
          loading={loading}
        />
      </View>
    </View>
  );
};
