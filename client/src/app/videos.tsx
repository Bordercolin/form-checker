import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { VideoView, useVideoPlayer } from "expo-video";
import { useAuth } from "@middleware/auth";
import { getVideosByUserId } from "./core/modules/videos/api";
import { useQuery } from "@tanstack/react-query";
import { LoadingScreen } from "@components/design/LoadingScreen";
import { Button } from "@components/design/Button";
import { ScreenLayout } from "@components/design/ScreenLayout";
import { useRouter } from "expo-router";

const Videos = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [selectedVideo, setSelectedVideo] = useState<any>(null);
  const screenHeight = Dimensions.get("window").height;

  // Hook must always be called at top level
  const videoPlayer = useVideoPlayer(selectedVideo?.file_url || "", (p) => {
    p.loop = false;
    p.muted = false;
  });

  // Autoplay when selectedVideo changes
  useEffect(() => {
    if (selectedVideo?.file_url) {
      videoPlayer.play();
    }
  }, [selectedVideo?.file_url]);

  const {
    data: videos,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["videos", user?.id],
    queryFn: () => getVideosByUserId(user?.id!),
    enabled: !!user?.id,
  });

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const playVideo = (video: any) => {
    setSelectedVideo(video);
  };

  const closeVideo = () => {
    videoPlayer.pause();
    setSelectedVideo(null);
  };

  if (isLoading) return <LoadingScreen />;
  if (error) return <Text>Error: {error.message}</Text>;

  if (selectedVideo) {
    return (
      <SafeAreaView className="flex-1 bg-black">
        <View className="flex-1">
          <VideoView
            player={videoPlayer}
            style={{
              width: "100%",
              height: screenHeight * 0.8,
              backgroundColor: "black",
            }}
            allowsPictureInPicture={false}
          />

          <View className="absolute top-12 left-4 right-4">
            <Button
              title="← Back to Videos"
              onPress={closeVideo}
              variant="outline"
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <ScreenLayout>
      <SafeAreaView className="flex-1">
        <View className="flex-1 px-4">
          <View className="flex-row justify-between items-center mb-6">
            <Text className="text-2xl font-bold text-gray-900">My Videos</Text>
            <Button
              title="Record New"
              onPress={() => router.push("/record")}
              variant="outline"
            />
          </View>

          {!videos || videos.length === 0 ? (
            <View className="flex-1 justify-center items-center">
              <Text className="text-gray-500 text-center mb-4">
                No videos recorded yet
              </Text>
              <Button
                title="Record Your First Video"
                onPress={() => router.push("/record")}
              />
            </View>
          ) : (
            <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
              <View className="space-y-4">
                {videos.map((video) => (
                  <TouchableOpacity
                    key={video.id}
                    onPress={() => playVideo(video)}
                    className="bg-white rounded-lg p-4 shadow-sm border border-gray-200"
                  >
                    <View className="flex-row items-center space-x-4">
                      <View className="w-16 h-16 bg-gray-100 rounded-lg items-center justify-center">
                        <Text className="text-2xl">🎥</Text>
                      </View>

                      <View className="flex-1">
                        <Text className="font-semibold text-gray-900 mb-1">
                          {video.filename}
                        </Text>
                        <View className="flex-row space-x-4">
                          {video.duration && (
                            <Text className="text-sm text-gray-500">
                              {Math.round(video.duration)}s
                            </Text>
                          )}
                          <Text className="text-sm text-gray-500">
                            {formatFileSize(video.file_size)}
                          </Text>
                        </View>
                        <Text className="text-xs text-gray-400 mt-1">
                          {formatDate(video.created_at)}
                        </Text>
                      </View>

                      <View className="items-center">
                        <Text className="text-2xl">▶️</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          )}
        </View>
      </SafeAreaView>
    </ScreenLayout>
  );
};

export default Videos;
