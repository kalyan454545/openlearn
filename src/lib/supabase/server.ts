import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

// Used in Server Components, Route Handlers, and Server Actions. Reads/writes
// the session via cookies — the cookie write in a Server Component render is
// expected to throw (Next.js forbids it there); middleware refreshes the
// session in that case, so the catch below is intentional, not swallowed error.
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
          } catch {
            // Called from a Server Component — session refresh happens in
            // middleware instead.
          }
        },
      },
    }
  );
}
