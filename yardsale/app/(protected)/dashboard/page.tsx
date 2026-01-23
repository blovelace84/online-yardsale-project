import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function DashboardPage() {
  const supabase = createSupabaseServerClient();

  const {
    data: { user },
  } = await (await supabase).auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: listings } = await (await supabase)
    .from("listings")
    .select("id, title , price, status, images")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">My Listings</h1>

      {listings?.length === 0 && (
        <p className="text-gray-600">You haven’t listed anything yet.</p>
      )}

      <div className="space-y-4">
        {listings?.map((listing) => (
          <div
            key={listing.id}
            className="border rounded-xl p-4 flex justify-between items-center"
          >
            <div>
              <h2 className="font-semibold">{listing.title}</h2>
              <p className="text-sm text-gray-600">
                ${listing.price} • {listing.status}
              </p>
            </div>

            <span
              className={`text-sm px-3 py-1 rounded-full ${
                listing.status === "available"
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {listing.status}
            </span>
          </div>
        ))}
      </div>
    </main>
  );
}
