export function FormCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full max-w-md mx-auto bg-white border rounded-xl p-6 shadow-sm">
      {children}
    </div>
  );
}

export function FormTitle({ children }: { children: React.ReactNode }) {
  return <h1 className="text-2xl font-bold text-center mb-6">{children}</h1>;
}

export function FormField({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium">{label}</label>
      {children}
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
    />
  );
}

export function Textarea(
  props: React.TextareaHTMLAttributes<HTMLTextAreaElement>,
) {
  return (
    <textarea
      {...props}
      className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
    />
  );
}

export function PrimaryButton({
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-900 disabled:opacity-50"
    >
      {children}
    </button>
  );
}
