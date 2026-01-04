import { supabase } from "@/lib/supabaseClient";
import { ItemGrid } from "@/components/ItemGrid";
import { Item } from "@/types/item";

export default async function Home() {
  const { data, error } = await supabase
    .from("items")
    .select("*")
    .order("created_at", { ascending: false });

  const items = (data ?? []) as Item[];

  if (error) {
    return <p>Error loading items</p>;
  }

  return (
    <main className="max-w-5xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Tee St Yard Sale</h1>

      <ItemGrid items={items} />
    </main>
  );
}
