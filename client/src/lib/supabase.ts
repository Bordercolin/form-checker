import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.EXPO_PUBLIC_SUPABASE_KEY!;

console.log("=== SUPABASE DEBUG ===");
console.log("URL:", process.env.EXPO_PUBLIC_SUPABASE_URL);
console.log(
  "Key length:",
  process.env.EXPO_PUBLIC_SUPABASE_KEY?.length || "undefined"
);
console.log("=====================");

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
      console.error("❌ Supabase connection failed:", error);
    } else {
      console.log("✅ Supabase connected successfully");
      console.log("Session:", data.session ? "Active" : "None");
    }
  })
  .catch((err) => {
    console.error("❌ Supabase connection error:", err);
  });
