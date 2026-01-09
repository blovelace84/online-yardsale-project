import RegisterForm from "@/components/auth/RegisterForm";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <>
      <RegisterForm />
      <p className="text-sm text-center mt-4 text-gray-700">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-medium text-gray-900 underline hover:text-black"
        >
          Login
        </Link>
      </p>
    </>
  );
}
