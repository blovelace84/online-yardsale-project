import LoginForm from "@/components/auth/LoginForm";
import Link from "next/link";

export default function LoginPage() {
  return (
    <>
      <LoginForm />
      <p className="text-sm text-center mt-4 text-gray-700">
        Don't have an account?{" "}
        <Link
          href="/register"
          className="font-medium text-gray-900 underline hover:text-black"
        >
          Register
        </Link>
      </p>
    </>
  );
}
