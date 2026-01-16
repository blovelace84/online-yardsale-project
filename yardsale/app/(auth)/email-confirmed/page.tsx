import Link from "next/link";

export default function EmailConfirmationPage() {
  return (
    <main className="mx-auto max-w-md p-6">
      <div className="rounded-xl border bg-white p-6 shadow-sm text-center">
        <h1 className="text-2xl font-bold text-gray-900">Email Confirmed!</h1>

        <p className="mt-2 text-sm text-gray-700">
          Your account has been successfully verified. You can now log in and
          start selling your items.
        </p>

        <Link
          href="/dashboard"
          className="mt-6 inline-block rounded-lg bg-black px-4 py-2 text-white hover:bg-gray-900"
        >
          Continue to Dashboard
        </Link>
      </div>
    </main>
  );
}
