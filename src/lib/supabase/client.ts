import { createBrowserClient } from "@supabase/ssr";

// Used in Client Components. Anonymous browsing works without ever calling
// this — only auth (magic link) and progress-saving need a signed-in client.
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
