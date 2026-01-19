"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@/lib/validators/auth";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import {
  FormCard,
  FormTitle,
  FormField,
  Input,
  PrimaryButton,
} from "@/components/ui/form";
import type { z } from "zod";

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
    const { error } = await supabase.auth.signUp(data);

    if (!error) {
      router.push("/check-email");
    }
  }

  return (
    <FormCard>
      <FormTitle>Create your account</FormTitle>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormField label="Email" error={errors.email?.message}>
          <Input {...register("email")} placeholder="you@example.com" />
        </FormField>

        <FormField label="Password" error={errors.password?.message}>
          <Input
            type="password"
            {...register("password")}
            placeholder="••••••••"
          />
        </FormField>

        <PrimaryButton disabled={isSubmitting}>
          {isSubmitting ? "Creating..." : "Create account"}
        </PrimaryButton>

        <p className="text-sm text-center text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-black underline">
            Log in
          </a>
        </p>
      </form>
    </FormCard>
  );
}
