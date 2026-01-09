import { createSupabaseServerClient } from "@/lib/supabase/server";
import ListingCard from "@/components/listings/ListingCard";

export default async function HomePage() {
  const supabase = createSupabaseServerClient();

  const { data: listings } = await (await supabase)
    .from("listings")
    .select("id, title, price, status")
    .eq("status", "available")
    .order("created_at", { ascending: false })
    .limit(12);

  return (
    <main className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">YardSale</h1>
        <p className="mt-2 text-gray-700">Buy and sell items locally</p>
      </header>

      {/* Listings */}
      {listings && listings.length === 0 && (
        <p className="text-gray-700">
          No items for sale yet. Be the first to list something!
        </p>
      )}

      <section className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {listings?.map((listing) => (
          <ListingCard key={listing.id} listing={listing} />
        ))}
      </section>
    </main>
  );
}
