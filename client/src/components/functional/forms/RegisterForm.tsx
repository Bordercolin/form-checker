import { Button } from "@components/design/Button";
import { InputField } from "@components/design/InputField";
import React, { useState } from "react";
import { View } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { supabase } from "@lib/supabase";

export const RegisterForm = () => {
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
    setPasswordError("");
    const { data: user, error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
    });
    console.log(user, error);
  };

  const password = watch("password");

  return (
    <View className="flex-1 justify-center items-center px-6">
      <View className="w-full max-w-sm space-y-6">
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
          <Button title="Register" onPress={handleSubmit(onSubmit)} fullWidth />
        </View>
      </View>
    </View>
  );
};
