import { createBrowserClient } from "@supabase/ssr";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://ozpkzwkeenxdgqiwcntm.supabase.co";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || "sb_publishable_jPjp50dV5aRoEXFJiTR0qQ_5nmTskxi";

export const createClient = () =>
  createBrowserClient(
    supabaseUrl,
    supabaseKey,
  );
