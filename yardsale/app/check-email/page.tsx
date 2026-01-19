export default function CheckEmailPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white p-6 rounded-lg border text-center space-y-4">
        <h1 className="text-2xl font-bold">Check your email</h1>

        <p className="text-gray-600">
          We’ve sent you a confirmation link.
          <br />
          Please check your inbox to verify your account.
        </p>

        <p className="text-sm text-gray-500">
          You can close this tab after confirming your email.
        </p>
      </div>
    </div>
  );
}
