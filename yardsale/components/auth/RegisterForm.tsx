"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";

export default function RegisterForm() {
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      setError(error.message);
      return;
    }

    setSuccess(true);
  }

  if (success) {
    return (
      <div className="w-full max-w-md text-center space-y-3">
        <h2 className="text-xl font-semibold">Check your email</h2>
        <p className="text-gray-600 text-sm">
          We sent you a confirmation link to finish creating your account.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleRegister}
      className="w-full max-w-md space-y-5 bg-white p-6 rounded-lg shadow"
    >
      <h1 className="text-2xl font-bold text-gray-900">Create an account</h1>

      {error && <p className="text-red-600 text-sm">{error}</p>}

      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Confirm password
          </label>
          <input
            type="password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="mt-1 w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-black text-white py-2 rounded hover:bg-gray-900 transition"
      >
        Create account
      </button>

      <p className="text-sm text-center text-gray-600">
        Already have an account?{" "}
        <Link href="/login" className="text-black font-medium hover:underline">
          Log in
        </Link>
      </p>

      <div className="text-center text-sm text-gray-500">
        or{" "}
        <Link href="/magic-link" className="text-blue-600 hover:underline">
          sign up with a magic link
        </Link>
      </div>
    </form>
  );
}
