"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase-client";
import { Skeleton } from "../../components/skeleton";

interface Profile {
  id: string;
  user_name: string;
  full_name: string;
  created_at: string;
  updated_at: string;
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [userName, setUserName] = useState("");
  const [fullName, setFullName] = useState("");
  const router = useRouter();

  useEffect(() => {
    async function fetchProfile() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.replace("/login");
        return;
      }
      try {
        const { data, error } = await supabase
          .from("Profile")
          .select("id, user_name, full_name, created_at, updated_at")
          .eq("id", session.user.id)
          .single();
        if (error) throw error;
        setProfile(data);
        setUserName(data.user_name || "");
        setFullName(data.full_name || "");
        setHasError(false);
      } catch (e) {
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    }
    fetchProfile();
  }, [router]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSuccess(false);
    setHasError(false);
    try {
      const { error } = await supabase
        .from("Profile")
        .update({ user_name: userName, full_name: fullName, updated_at: new Date().toISOString() })
        .eq("id", profile?.id);
      if (error) throw error;
      setSuccess(true);
    } catch (e) {
      setHasError(true);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-orange-50 flex flex-col items-center justify-center py-10 px-4">
        <div className="bg-white rounded-xl shadow p-8 w-full max-w-md">
          <Skeleton className="h-8 w-1/2 mb-6" />
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-6 w-full mb-4" />
          ))}
          <Skeleton className="h-10 w-full mt-6" />
        </div>
      </div>
    );
  }
  if (hasError || !profile) {
    return <div className="flex justify-center items-center min-h-screen text-red-600">Failed to load profile.</div>;
  }

  return (
    <div className="min-h-screen bg-orange-50 flex flex-col items-center justify-center py-10 px-4">
      <div className="absolute top-6 left-6">
        <a
          href="/dashboard"
          className="flex items-center space-x-2 text-gray-600 hover:text-orange-600 transition-colors"
          aria-label="Go back to dashboard"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span>Go Back</span>
        </a>
      </div>
      <div className="bg-white rounded-xl shadow p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Your Profile</h1>
        <form onSubmit={handleSave} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Username</label>
            <input
              type="text"
              className="w-full border border-orange-200 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={userName}
              onChange={e => setUserName(e.target.value)}
              required
              disabled={isSaving || success}
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Full Name</label>
            <input
              type="text"
              className="w-full border border-orange-200 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={fullName}
              onChange={e => setFullName(e.target.value)}
              required
              disabled={isSaving || success}
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Joined</label>
            <div className="text-gray-500">{new Date(profile.created_at).toLocaleDateString()}</div>
          </div>
          {success ? (
            <a
              href="/dashboard"
              className="w-full block bg-orange-600 text-white py-2 rounded font-semibold text-center hover:bg-orange-700 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500"
              aria-label="Return to dashboard"
            >
              Return to Dashboard
            </a>
          ) : (
            <button
              type="submit"
              className="w-full bg-orange-600 text-white py-2 rounded font-semibold hover:bg-orange-700 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500"
              disabled={isSaving}
            >
              {isSaving ? "Saving..." : "Save Changes"}
            </button>
          )}
          {success && <div className="text-green-600 text-center">Profile updated!</div>}
          {hasError && <div className="text-red-600 text-center">Failed to update profile.</div>}
        </form>
      </div>
    </div>
  );
} 