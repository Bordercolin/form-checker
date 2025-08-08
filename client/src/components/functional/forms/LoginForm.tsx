import { Button } from "@components/design/Button";
import { InputField } from "@components/design/InputField";
import React, { useState } from "react";
import { View, Text } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { supabase } from "@lib/supabase";

export const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: { email: string; password: string }) => {
    setLoading(true);
    setError("");

    const { data: user, error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    if (error) {
      setError(error.message);
    }

    setLoading(false);
  };

  return (
    <View className="space-y-6">
      {error && (
        <View className="bg-red-50 border border-red-200 rounded-lg p-3">
          <Text className="text-red-600 text-sm">{error}</Text>
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

      <View className="mt-4">
        <Button
          title={loading ? "Signing in..." : "Login"}
          onPress={handleSubmit(onSubmit)}
          fullWidth
          loading={loading}
        />
      </View>
    </View>
  );
};
