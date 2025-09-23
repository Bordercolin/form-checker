import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.EXPO_PUBLIC_SUPABASE_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

console.log("Testing Supabase connection...");
supabase.auth
  .getSession()
  .then(({ data, error }) => {
    if (error) {
      console.error("❌ Supabase session error:", error);
    } else {
      console.log("✅ Supabase session retrieved successfully");
    }
  })
  .catch((err) => {
    console.error("❌ Supabase connection error:", err);
  });
