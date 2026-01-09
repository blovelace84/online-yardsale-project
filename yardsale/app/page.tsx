import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function Home() {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase.auth.getUser();
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold">Tee Dee St Yard Sale</h1>
      <pre className="mt-4">{JSON.stringify(data, null, 2)}</pre>
    </main>
  );
}
