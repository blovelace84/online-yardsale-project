"use server";

import { listingSchema } from "@/lib/validators/listing";
import { createServerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { randomUUID } from "crypto";

export async function createListing(
  formData: FormData
): Promise<{ error?: any; success?: boolean }> {
  const parsed = listingSchema.safeParse({
    title: formData.get("title"),
    price: formData.get("price"),
    description: formData.get("description"),
  });

  if (!parsed.success) {
    return { error: parsed.error.flatten().fieldErrors };
  }

  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: cookieStore }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Unauthorized" };
  }

  // Upload images
  const images = formData.getAll("images") as File[];
  const imageUrls: string[] = [];

  for (const image of images) {
    if (!image.size) continue;

    const path = `${user.id}/${randomUUID()}.${image.name.split(".").pop()}`;

    const { error } = await supabase.storage
      .from("listing-images")
      .upload(path, image);

    if (error) {
      return { error: "Image upload failed" };
    }

    const { data } = supabase.storage
      .from("listing-images")
      .getPublicUrl(path);

    imageUrls.push(data.publicUrl);
  }

  const { error } = await supabase.from("listings").insert({
    ...parsed.data,
    user_id: user.id,
    images: imageUrls,
  });

  if (error) {
    return { error: "Failed to create listing" };
  }

  return { success: true };
}
