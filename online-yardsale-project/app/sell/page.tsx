"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function SellPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [contact, setContact] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    let imageUrl: string | null = null;

    // Upload image (if provided)
    if (image) {
      const ext = image.name.split(".").pop();
      const fileName = `${crypto.randomUUID()}.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from("items")
        .upload(fileName, image);

      if (uploadError) {
        router.push("/?status=error");
        return;
      }

      const { data } = supabase.storage.from("items").getPublicUrl(fileName);

      imageUrl = data.publicUrl;
    }

    // Insert item
    const { error } = await supabase.from("items").insert({
      title: name,
      price: Number(price),
      description,
      contact,
      image_url: imageUrl,
    });

    if (error) {
      router.push("/?status=error");
      return;
    }

    // Redirect to homepage with success message
    router.push("/?status=success");
  }

  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Sell an Item</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Item name */}
        <input
          required
          placeholder="Item name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded border p-2"
        />

        {/* Price */}
        <input
          required
          type="number"
          min="0"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full rounded border p-2"
        />

        {/* Description */}
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full rounded border p-2"
          rows={4}
        />

        {/* Contact info */}
        <input
          placeholder="Contact info (email or phone)"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          className="w-full rounded border p-2"
        />

        {/* Image upload */}
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files?.[0] ?? null)}
        />

        {/* Submit button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded bg-black text-white py-2 disabled:opacity-50 cursor-pointer"
        >
          {loading ? "Posting..." : "Post Item"}
        </button>
      </form>
    </div>
  );
}
