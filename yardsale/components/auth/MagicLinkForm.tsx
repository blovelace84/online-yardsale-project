"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function MagicLinkForm() {
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  async function handleMagicLink(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      setError(error.message);
      return;
    }

    setSent(true);
  }

  if (sent) {
    return (
      <div className="max-w-md text-center">
        <h2 className="text-xl font-semibold mb-2">Check your email</h2>
        <p className="text-gray-600">We sent you a magic link to sign in.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleMagicLink} className="w-full max-w-md space-y-4">
      <h1 className="text-2xl font-bold">Sign in with Magic Link</h1>

      {error && <p className="text-red-600 text-sm">{error}</p>}

      <input
        type="email"
        required
        placeholder="you@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full border px-3 py-2 rounded"
      />

      <button type="submit" className="w-full bg-black text-white py-2 rounded">
        Send Magic Link
      </button>
    </form>
  );
}
