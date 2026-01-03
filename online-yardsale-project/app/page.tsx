import { supabase } from "@/lib/supabaseClient";
import { ItemGrid } from "@/components/ItemGrid";

export default async function Home() {
  const { data: items, error } = await supabase
    .from("items")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return <p>Error loading items</p>;
  }

  return (
    <main className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Tee Dee St. Yard Sale</h1>
      <ItemGrid items={items ?? []} />
      <div className="grid grid-cols-1 md:grid-cols-3 mb-6">
        {items?.map((item) => (
          <div key={item.id} className="border rounded-xl p-4">
            <h2 className="font-semibold">{item.title}</h2>
            <p className="text-gray-600">{item.price}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
