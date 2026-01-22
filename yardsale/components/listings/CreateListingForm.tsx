"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function CreateListingForm() {
  const supabase = createClient();

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!title || !price) {
      setError("Title and price are required");
      return;
    }

    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setError("You must be logged in");
      setLoading(false);
      return;
    }

    // Upload images
    const imageUrls: string[] = [];

    for (const file of images) {
      const filePath = `${user.id}/${Date.now()}-${file.name}`;

      const { error: uploadError } = await supabase.storage
        .from("listing-images")
        .upload(filePath, file);

      if (uploadError) {
        setError("Failed to upload image");
        setLoading(false);
        return;
      }

      const { data } = supabase.storage
        .from("listing-images")
        .getPublicUrl(filePath);

      imageUrls.push(data.publicUrl);
    }

    // Insert listing
    const { error: insertError } = await supabase.from("listings").insert({
      title,
      price: Number(price),
      description,
      images: imageUrls,
      user_id: user.id,
    });

    if (insertError) {
      console.error("Supabase insert error:", insertError);
      setError("Failed to create listing");
      setLoading(false);
      return;
    }

    // Reset
    setTitle("");
    setPrice("");
    setDescription("");
    setCategory("");
    setImages([]);
    setLoading(false);
    alert("Listing created!");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white p-6 rounded-lg border space-y-4"
    >
      <h1 className="text-2xl font-bold text-center">Sell an item</h1>

      {error && <p className="text-red-600 text-sm">{error}</p>}

      <div>
        <label className="block text-sm font-medium">Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border rounded px-3 py-2"
          placeholder="Vintage chair"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Price</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full border rounded px-3 py-2"
          placeholder="25"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border rounded px-3 py-2"
          rows={3}
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Category</label>
        <input
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border rounded px-3 py-2"
          placeholder="Furniture"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Images</label>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => setImages(Array.from(e.target.files || []))}
        />
      </div>

      <button
        disabled={loading}
        className="w-full bg-black text-white py-2 rounded hover:bg-gray-900 disabled:opacity-50"
      >
        {loading ? "Posting..." : "Post Listing"}
      </button>
    </form>
  );
}
