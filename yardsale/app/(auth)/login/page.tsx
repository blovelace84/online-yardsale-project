import LoginForm from "@/app/components/auth/LoginForm";
import Link from "next/link";

export default function LoginPage() {
  return (
    <>
      <LoginForm />
      <p className="text-sm text-center mt-4">
        Don't have an account?{" "}
        <Link href="/register" className="text-blue-600 hover:underline">
          Register
        </Link>
      </p>
    </>
  );
}
