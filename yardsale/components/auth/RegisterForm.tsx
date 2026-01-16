"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import type { z } from "zod";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { registerSchema } from "@/lib/validators/auth";

type RegisterInput = z.infer<typeof registerSchema>;

export default function RegisterForm() {
  const supabase = createClient();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  async function onSubmit(data: RegisterInput) {
    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
    });

    if (!error) {
      router.push("/check-email");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <input {...register("email")} placeholder="Email" />
        {errors.email && (
          <p className="text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      <div>
        <input
          type="password"
          {...register("password")}
          placeholder="Password"
        />
        {errors.password && (
          <p className="text-sm text-red-600">{errors.password.message}</p>
        )}
      </div>

      <button disabled={isSubmitting}>
        {isSubmitting ? "Creating..." : "Create account"}
      </button>
    </form>
  );
}
