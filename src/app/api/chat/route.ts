import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit } from "@/lib/rateLimit";
import { searchCourses } from "@/lib/courses";

// Server-side only — ANTHROPIC_API_KEY never reaches the browser. This
// route is public and requires no account (per the app's hard requirement
// that browsing/using the site never requires signing in), so it's rate
// limited per-IP instead of per-user.
export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const { allowed, remaining } = checkRateLimit(ip);
  if (!allowed) {
    return NextResponse.json(
      { error: "Too many messages — try again in a bit." },
      { status: 429 }
    );
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "The AI guide isn't configured yet — add ANTHROPIC_API_KEY to .env.local." },
      { status: 503 }
    );
  }

  const body = await request.json().catch(() => null);
  const message = typeof body?.message === "string" ? body.message.trim() : "";
  if (!message || message.length > 500) {
    return NextResponse.json({ error: "Send a real question (under 500 characters)." }, { status: 400 });
  }

  const matches = searchCourses(message);
  const catalogContext =
    matches.length > 0
      ? `Matching courses in the catalog:\n${matches
          .map((c) => `- "${c.title}" (${c.provider}, ${c.hours}h, ${c.category})`)
          .join("\n")}`
      : "No courses in the catalog matched this query closely — say so honestly, don't invent one.";

  try {
    const anthropicRes = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 300,
        system:
          "You are OpenLearn's guide — a warm, direct, concise assistant embedded in the homepage as a glowing orb. " +
          "OpenLearn is a free, ad-free learning catalog. Answer the visitor's question in 2-4 sentences, " +
          "conversational, no bullet lists, no headers, no emoji, no 'As an AI'. If the catalog context below has " +
          "relevant courses, recommend them by name with the provider and hours. If nothing matches, say so " +
          "honestly and suggest browsing the catalog instead of inventing a course that doesn't exist.\n\n" +
          catalogContext,
        messages: [{ role: "user", content: message }],
      }),
    });

    const data = await anthropicRes.json();
    if (!anthropicRes.ok) {
      throw new Error(data?.error?.message || "Anthropic request failed.");
    }
    const text = (data.content || [])
      .filter((b: { type: string }) => b.type === "text")
      .map((b: { text: string }) => b.text)
      .join("\n")
      .trim();

    return NextResponse.json({ reply: text, courses: matches, remaining });
  } catch (err) {
    console.error("Chat route error:", err);
    return NextResponse.json({ error: "Something went wrong reaching the AI guide." }, { status: 502 });
  }
}
