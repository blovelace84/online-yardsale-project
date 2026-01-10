import LoginForm from "@/components/auth/LoginForm";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md space-y-6">
        <LoginForm />

        <div className="text-center text-sm text-gray-600">
          <p>Or</p>
          <Link href="/magic-link" className="text-blue-600 hover:underline">
            Sign in with a magic link
          </Link>
        </div>
      </div>
    </div>
  );
}
