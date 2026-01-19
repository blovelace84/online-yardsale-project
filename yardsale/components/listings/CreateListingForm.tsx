"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { listingSchema } from "@/lib/validators/listing";
import { createListing } from "@/lib/actions/createListing";
import type { z } from "zod";

type ListingInput = z.infer<typeof listingSchema>;

export default function CreateListingForm() {
  const [serverErrors, setServerErrors] = useState<any>(null);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ListingInput>({
    resolver: zodResolver(listingSchema),
  });

  async function onSubmit(data: ListingInput) {
    setLoading(true);
    setServerErrors(null);

    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('price', data.price.toString());
    if (data.description) {
      formData.append('description', data.description);
    }

    const result = await createListing(formData);

    setLoading(false);

    if (result?.error) {
      setServerErrors(result.error);
      return;
    }

    alert("Listing created!");
  }

  function handleImagePreview(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || []);
    setPreviewImages(files.map((file) => URL.createObjectURL(file)));
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* TITLE */}
      <div>
        <label>Title</label>
        <input {...register("title")} className="input" />
        {errors.title && <p className="error">{errors.title.message}</p>}
      </div>

      {/* PRICE */}
      <div>
        <label>Price</label>
        <input
          type="number"
          step="0.01"
          {...register("price", { valueAsNumber: true })}
          className="input"
        />
        {errors.price && <p className="error">{errors.price.message}</p>}
      </div>

      {/* DESCRIPTION */}
      <div>
        <label>Description</label>
        <textarea {...register("description")} className="input" />
      </div>

      {/* IMAGES */}
      <div>
        <label>Images</label>
        <input
          type="file"
          multiple
          accept="image/*"
          name="images"
          onChange={handleImagePreview}
        />

        <div className="flex gap-2 mt-2">
          {previewImages.map((src, i) => (
            <img
              key={i}
              src={src}
              className="w-20 h-20 object-cover rounded"
            />
          ))}
        </div>
      </div>

      {/* SERVER ERRORS */}
      {serverErrors && (
        <p className="text-red-600 text-sm">
          Something went wrong
        </p>
      )}

      <button
        disabled={loading}
        className="bg-black text-white px-6 py-2 rounded"
      >
        {loading ? "Creating..." : "Create Listing"}
      </button>
    </form>
  );
}
