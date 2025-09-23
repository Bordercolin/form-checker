import { View, Text, Button } from "react-native";
import React, { useRef, useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  CameraView,
  useCameraPermissions,
  useMicrophonePermissions,
} from "expo-camera";

export default function Record() {
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [microphonePermission, requestMicrophonePermission] =
    useMicrophonePermissions();
  const cameraRef = useRef<CameraView>(null);
  const [isRecording, setIsRecording] = useState(false);

  // Request permissions on component mount
  useEffect(() => {
    (async () => {
      await requestCameraPermission();
      await requestMicrophonePermission();
    })();
  }, []);

  if (!cameraPermission || !microphonePermission) {
    // Permissions are still loading
    return <View />;
  }

  if (!cameraPermission.granted || !microphonePermission.granted) {
    // Permissions are not granted
    return (
      <View className="flex-1 justify-center items-center p-4">
        <Text className="text-center text-lg mb-4">
          We need your permission to use the camera and microphone.
        </Text>
        <Button
          onPress={() => {
            requestCameraPermission();
            requestMicrophonePermission();
          }}
          title="Grant Permissions"
        />
      </View>
    );
  }

  const handleRecording = async () => {
    if (isRecording) {
      // --- STOP RECORDING ---
      if (cameraRef.current) {
        cameraRef.current.stopRecording();
        setIsRecording(false); // Set state immediately
      }
    } else {
      // --- START RECORDING ---
      if (cameraRef.current) {
        setIsRecording(true); // Set state immediately
        try {
          const video = await cameraRef.current.recordAsync();
          console.log("Video saved to:", video.uri);
          // You can now use the video URI, e.g., navigate to a preview screen
        } catch (error) {
          console.error("Recording failed: ", error);
          setIsRecording(false); // Reset state on error
        }
      }
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-black">
      <CameraView
        style={{ flex: 1 }}
        ref={cameraRef}
        mode="video" // Explicitly set to video mode
      />
      <View className="absolute bottom-16 left-0 right-0 items-center">
        <Button
          title={isRecording ? "Stop Recording" : "Start Recording"}
          onPress={handleRecording}
          color={isRecording ? "red" : "white"}
        />
      </View>
    </SafeAreaView>
  );
}