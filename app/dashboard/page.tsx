"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase-client";
import { Card } from "../../components/card";
import { Skeleton } from "../../components/skeleton";

interface Recipe {
  id: string;
  title: string;
  ingredients: string;
  instructions: string;
  cooking_time: number;
  difficulty: string;
  category: string;
  user_id: string;
  Profile?: { full_name: string } | { full_name: string }[];
}

export default function DashboardPage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const router = useRouter();

  useEffect(() => {
    async function fetchUserAndRecipes() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.replace("/login");
        return;
      }
      setCurrentUserId(session.user.id);
      try {
        const { data, error } = await supabase
          .from("Recipe")
          .select("id, title, ingredients, instructions, cooking_time, difficulty, category, user_id, Profile(full_name)");
        if (error) throw error;
        setRecipes((data || []).map(r => ({ ...r, Profile: Array.isArray(r.Profile) ? r.Profile[0] : r.Profile })));
        setHasError(false);
      } catch (e) {
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    }
    fetchUserAndRecipes();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this recipe?")) return;
    const { error } = await supabase.from("Recipe").delete().eq("id", id);
    if (!error) {
      setRecipes((prev) => prev.filter((r) => r.id !== id));
    } else {
      alert("Failed to delete recipe: " + error.message);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto py-10">
        <div className="mb-8">
          <Skeleton className="h-10 w-1/2 mb-4" />
          <Skeleton className="h-8 w-1/3 mb-6" />
        </div>
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-12 w-full mb-4" />
        ))}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-orange-50 py-10 px-4 relative">
      {/* Log Out and Edit Profile buttons in upper right */}
      <div className="absolute top-6 right-6 flex gap-2">
        <a
          href="/profile"
          className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500"
          aria-label="Edit Profile"
        >
          Edit Profile
        </a>
        <button
          onClick={handleLogout}
          className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500"
          aria-label="Log out"
        >
          Log Out
        </button>
      </div>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Dashboard</h1>
        <div className="flex justify-center mb-8">
          <a
            href="/dashboard/new"
            className="bg-orange-600 text-white px-6 py-3 rounded-full font-semibold shadow hover:bg-orange-700 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500"
            tabIndex={0}
            aria-label="Add new recipe"
          >
            Add New Recipe
          </a>
        </div>
        <div className="mb-6 flex justify-center">
          <input
            type="text"
            placeholder="Search recipes by title..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full max-w-md px-4 py-2 border border-orange-200 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
            aria-label="Search recipes by title"
          />
        </div>
        <div className="grid gap-6">
          {hasError ? (
            <div className="text-center text-red-600">Failed to load recipes.</div>
          ) : recipes.length === 0 ? (
            <div className="text-center text-gray-500">No recipes found.</div>
          ) : (
            recipes
              .filter(recipe => recipe.title.toLowerCase().includes(search.toLowerCase()))
              .map((recipe) => (
                <div
                  key={recipe.id}
                  className="flex items-center justify-between px-3 py-2 bg-white rounded-lg shadow hover:shadow-md transition-shadow duration-200 border border-orange-100 text-base font-semibold text-orange-700 hover:text-orange-900 mb-2"
                >
                  <a
                    href={`/recipes/${recipe.id}`}
                    className="flex-1 min-w-0 truncate"
                  >
                    <div>{recipe.title}</div>
                    <div className="text-xs text-gray-500 font-normal mt-1">
                      By {Array.isArray(recipe.Profile) ? recipe.Profile[0]?.full_name ?? 'Unknown' : recipe.Profile?.full_name ?? 'Unknown'}
                    </div>
                  </a>
                  {currentUserId && recipe.user_id === currentUserId && (
                    <button
                      onClick={() => handleDelete(recipe.id)}
                      className="ml-4 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-xs font-normal focus:outline-none focus:ring-2 focus:ring-red-400"
                      aria-label="Delete recipe"
                    >
                      Delete
                    </button>
                  )}
                </div>
              ))
          )}
        </div>
      </div>
    </div>
  );
} 