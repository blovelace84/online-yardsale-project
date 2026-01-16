import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import ProfileForm from "@/components/profile/ProfileForm";

export default async function ProfilePage() {
  const cookieStore = cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: async () => (await cookieStore).getAll(),
      },
    }
  );

  // 1️⃣ Get authenticated user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // 2️⃣ Fetch profile
  const { data: profile, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (error || !profile) {
    throw new Error("Profile not found");
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Account Settings</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* LEFT PROFILE CARD */}
        <div className="md:col-span-1">
          <div className="bg-white border rounded-lg p-6 text-center space-y-4">
            <div className="w-24 h-24 mx-auto rounded-full bg-gray-200 flex items-center justify-center text-2xl font-bold">
              {profile.full_name?.[0] ?? "U"}
            </div>

            <div>
              <p className="font-semibold text-lg">
                {profile.full_name || "Your Name"}
              </p>
              <p className="text-sm text-gray-500">{profile.email}</p>
            </div>

            <span className="text-sm text-blue-600">View public profile</span>
          </div>
        </div>

        {/* RIGHT FORM */}
        <div className="md:col-span-2">
          <div className="bg-white border rounded-lg p-6">
            <ProfileForm profile={profile} />
          </div>
        </div>
      </div>
    </div>
  );
}
