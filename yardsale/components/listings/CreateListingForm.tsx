"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function SellItemForm() {
  const supabase = createClient();
  const router = useRouter();

  const [images, setImages] = useState<FileList | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const title = (formData.get("title") as string)?.trim() || "";
    const description = (formData.get("description") as string)?.trim() || "";
    const price = Number(formData.get("price"));
    const category = (formData.get("category") as string)?.trim() || "";
    const contact_name = (formData.get("contact_name") as string)?.trim() || "";
    const contact_email = (formData.get("contact_email") as string)?.trim() || "";
    const contact_phone = (formData.get("contact_phone") as string)?.trim() || "";

    if (!title || !price || !contact_email) {
      setError("Title, price, and contact email are required.");
      setLoading(false);
      return;
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setError("You must be logged in.");
      setLoading(false);
      return;
    }

    // Upload images
    let imageUrls: string[] = [];

    if (images) {
      for (const file of Array.from(images)) {
        if (!file.type.startsWith("image/")) {
          setError("Only image files are allowed.");
          setLoading(false);
          return;
        }

        if (file.size > 5_000_000) {
          setError("Each image must be under 5MB.");
          setLoading(false);
          return;
        }

        const filePath = `${user.id}/${crypto.randomUUID()}-${file.name}`;

        const { error: uploadError } = await supabase.storage
          .from("listing-images")
          .upload(filePath, file);

        if (uploadError) {
          setError(uploadError.message);
          setLoading(false);
          return;
        }

        const { data } = supabase.storage
          .from("listing-images")
          .getPublicUrl(filePath);

        imageUrls.push(data.publicUrl);
      }
    }

    // Insert listing
    const { error: insertError } = await supabase.from("listings").insert({
      title,
      description,
      price,
      category,
      images: imageUrls,
      contact_name,
      contact_email,
      contact_phone,
      user_id: user.id,
    });

    if (insertError) {
      setError(insertError.message);
      setLoading(false);
      return;
    }

    router.push("/dashboard");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto max-w-2xl space-y-6 rounded-xl border bg-white p-8 shadow"
    >
      <h1 className="text-2xl font-bold">Sell an Item</h1>

      {error && (
        <div className="rounded bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Item Info */}
      <div className="space-y-4">
        <input
          name="title"
          placeholder="Item title"
          className="w-full rounded border p-2"
          required
        />

        <textarea
          name="description"
          placeholder="Item description"
          className="w-full rounded border p-2"
          rows={4}
        />

        <div className="grid grid-cols-2 gap-4">
          <input
            name="price"
            type="number"
            step="0.01"
            placeholder="Price"
            className="rounded border p-2"
            required
          />

          <input
            name="category"
            placeholder="Category"
            className="rounded border p-2"
          />
        </div>
      </div>

      {/* Images */}
      <div>
        <label className="block text-sm font-medium">
          Upload images
        </label>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => setImages(e.target.files)}
          className="mt-1 block w-full"
        />
        <p className="mt-1 text-xs text-gray-500">
          JPG / PNG · Max 5MB each
        </p>
      </div>

      {/* Contact Info */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Contact Information</h2>

        <input
          name="contact_name"
          placeholder="Your name"
          className="w-full rounded border p-2"
        />

        <input
          name="contact_email"
          type="email"
          placeholder="Email address"
          className="w-full rounded border p-2"
          required
        />

        <input
          name="contact_phone"
          placeholder="Phone number (optional)"
          className="w-full rounded border p-2"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded bg-black py-3 text-white hover:bg-gray-900 disabled:opacity-50"
      >
        {loading ? "Posting..." : "Post Listing"}
      </button>
    </form>
  );
}
