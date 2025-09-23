// In src/app/core/modules/videos/api.ts
import { supabase } from "@lib/supabase";
import { VideoItem } from "./types";

export const getVideosByUserId = async (userId: string) => {
  if (!userId) throw new Error("User ID is required");
  
  const { data, error } = await supabase
    .from("videos")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });
    
  if (error) throw error;
  return data;
};