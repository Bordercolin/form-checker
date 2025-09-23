import { View, Text, Button } from "react-native";
import React, { useRef, useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  CameraView,
  useCameraPermissions,
  useMicrophonePermissions,
} from "expo-camera";
import { Video } from "expo-av";
import { File, Paths } from "expo-file-system";
import * as FileSystem from "expo-file-system/legacy";

import { supabase } from "../lib/supabase";
import { useAuth } from "@middleware/auth";

export default function Record() {
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [microphonePermission, requestMicrophonePermission] =
    useMicrophonePermissions();
  const cameraRef = useRef<CameraView>(null);
  const [isRecording, setIsRecording] = useState(false);

  const [videoUri, setVideoUri] = useState<string | null>(null);

  const { user } = useAuth();

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
        setIsRecording(false);
      }
    } else {
      // --- START RECORDING ---
      if (cameraRef.current) {
        setIsRecording(true);
        try {
          const video = await cameraRef.current.recordAsync();
          console.log("🎥 Video saved to:", video.uri);
          setVideoUri(video.uri);
        } catch (error) {
          console.error("❌ Recording failed: ", error);
          setIsRecording(false);
        }
      }
    }
  };

  const handleRetake = () => {
    setVideoUri(null);
    setIsRecording(false);
  };

  const handleUpload = async () => {
    if (!videoUri) return;

    try {
      // 1. Read file into base64
      const base64 = await FileSystem.readAsStringAsync(videoUri, {
        encoding: "base64",
      });

      // 2. Convert base64 → Uint8Array
      const fileBytes = Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));

      // 3. Generate filename with "video-" prefix
      const fileName = `video-${Date.now()}.mp4`;

      // 4. Upload directly using Uint8Array
      const { data, error } = await supabase.storage
        .from("form-video")
        .upload(`videos/${user.id}/${fileName}`, fileBytes, {
          contentType: "video/mp4",
          upsert: true,
        });

      if (error) {
        console.error("❌ Upload error:", error);
        alert("Upload failed: " + error.message);
      } else {
        console.log("✅ Uploaded successfully:", data);

        // 5. Get public URL
        const { data: publicUrlData } = supabase.storage
          .from("form-video")
          .getPublicUrl(`videos/${user.id}/${fileName}`);

        alert("Video uploaded! " + publicUrlData.publicUrl);
      }
    } catch (err) {
      console.error("❌ Upload failed:", err);
      alert("Upload failed, check console.");
    }
  };

  if (videoUri) {
    return (
      <SafeAreaView className="flex-1 bg-black justify-center items-center">
        <Video
          source={{ uri: videoUri }}
          style={{ width: "100%", height: 400 }}
          useNativeControls
          shouldPlay
        />
        <View className="flex-row mt-4 space-x-4">
          <Button title="Retake" onPress={handleRetake} color="orange" />
          <Button title="Upload" onPress={handleUpload} color="green" />
        </View>
      </SafeAreaView>
    );
  }

  // Camera screen
  return (
    <SafeAreaView className="flex-1 bg-black">
      <CameraView style={{ flex: 1 }} ref={cameraRef} mode="video" />
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
