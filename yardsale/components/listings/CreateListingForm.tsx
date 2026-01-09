"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function CreateListingForm() {
  const supabase = createClient();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error } = await supabase.from("listings").insert({
      title,
      description,
      price: Number(price),
      category,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    router.push("/dashboard");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-xl border bg-white p-6 shadow-sm"
    >
      {/* Error */}
      {error && <p className="text-sm text-red-600">{error}</p>}

      {/* Title */}
      <div>
        <label className="block text-sm font-medium text-gray-900">Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="mt-1 w-full rounded-md border px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black"
          placeholder="Bicycle, couch, lamp..."
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-900">
          Description
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          rows={4}
          className="mt-1 w-full rounded-md border px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black"
          placeholder="Describe the item condition..."
        />
      </div>

      {/* Price */}
      <div>
        <label className="block text-sm font-medium text-gray-900">
          Price ($)
        </label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          className="mt-1 w-full rounded-md border px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-black"
        />
      </div>

      {/* Category */}
      <div>
        <label className="block text-sm font-medium text-gray-900">
          Category
        </label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          className="mt-1 w-full rounded-md border bg-white px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-black"
        >
          <option value="">Select a category</option>
          <option value="furniture">Furniture</option>
          <option value="electronics">Electronics</option>
          <option value="clothing">Clothing</option>
          <option value="other">Other</option>
        </select>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-black py-2 text-white hover:bg-gray-900 disabled:opacity-50"
      >
        {loading ? "Creating..." : "Create Listing"}
      </button>
    </form>
  );
}
