"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import type { BlobState } from "@/components/HeroBlob";
import type { Course } from "@/lib/courses";

const HeroBlob = dynamic(() => import("@/components/HeroBlob").then((m) => m.HeroBlob), {
  ssr: false,
});

// The iridescent blob doubles as the visual identity of OpenLearn's AI
// guide: idle while waiting, spins up while thinking, pulses gently while
// its reply is on screen. This component owns that state machine and the
// actual /api/chat round trip; HeroBlob itself only knows how to render a
// given state, never anything about chat/network.
export function HeroChat() {
  const [input, setInput] = useState("");
  const [blobState, setBlobState] = useState<BlobState>("idle");
  const [reply, setReply] = useState<string | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [error, setError] = useState<string | null>(null);

  const ask = async (e: React.FormEvent) => {
    e.preventDefault();
    const message = input.trim();
    if (!message || blobState === "thinking") return;

    setBlobState("thinking");
    setError(null);
    setReply(null);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ message }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Something went wrong.");
      setReply(data.reply);
      setCourses(data.courses || []);
      setBlobState("speaking");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setBlobState("idle");
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="size-[340px] sm:size-[420px]">
        <HeroBlob state={blobState} />
      </div>

      <form onSubmit={ask} className="glass mt-6 flex w-full max-w-md rounded-full px-2 py-1.5">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask the guide — “any good Python courses?”"
          className="flex-1 bg-transparent px-3 py-2 text-sm text-paper placeholder:text-paper-soft focus:outline-none"
        />
        <button
          type="submit"
          disabled={blobState === "thinking" || !input.trim()}
          className="rounded-full bg-paper px-4 py-2 text-sm text-void disabled:opacity-40"
        >
          {blobState === "thinking" ? "…" : "Ask"}
        </button>
      </form>

      {error && <p className="mt-4 max-w-md text-center text-sm text-glow-pink">{error}</p>}

      {reply && (
        <div className="glass mt-4 max-w-md rounded-2xl px-5 py-4 text-sm text-paper-soft">
          <p>{reply}</p>
          {courses.length > 0 && (
            <ul className="mt-3 space-y-1 border-t border-rule pt-3">
              {courses.map((c) => (
                <li key={c.callNumber} className="flex justify-between gap-3 text-xs">
                  <span className="text-paper">{c.title}</span>
                  <span className="shrink-0 font-mono text-paper-soft">{c.hours}h</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
