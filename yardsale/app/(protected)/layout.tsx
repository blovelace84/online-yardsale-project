import Link from "next/link";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <nav className="border-b p-4">
        <div className="max-w-4xl mx-auto flex justify-between">
          <Link href="/" className="font-bold">
            YardSale
          </Link>

          <div className="space-x-4">
            <Link href="/sell">Sell</Link>
            <Link href="/dashboard">Dashboard</Link>
          </div>
        </div>
      </nav>
      {children}
    </>
  );
}
