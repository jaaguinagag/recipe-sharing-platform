"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabase-client";
import { Skeleton } from "../../../components/skeleton";

const difficulties = ["Easy", "Medium", "Hard"];

export default function NewRecipePage() {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const [difficulty, setDifficulty] = useState(difficulties[0]);
  const [categories, setCategories] = useState<string[]>([]);
  const [category, setCategory] = useState("");
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [categoriesError, setCategoriesError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function fetchCategories() {
      setCategoriesLoading(true);
      const { data, error } = await supabase.from("Category").select("category");
      if (error) {
        setCategoriesError(error.message);
        console.error("Error fetching categories:", error.message);
      } else if (data) {
        const categoryList = data.map((c: { category: string }) => c.category);
        setCategories(categoryList);
        setCategory(categoryList[0] || "");
      }
      setCategoriesLoading(false);
    }
    fetchCategories();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setIsLoading(true);
    // Get current user
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      setError("You must be logged in to create a recipe.");
      setIsLoading(false);
      return;
    }
    try {
      const { error } = await supabase.from("Recipe").insert({
        user_id: session.user.id,
        title,
        ingredients,
        instructions,
        cooking_time: cookingTime ? Number(cookingTime) : null,
        difficulty,
        category,
      });
      if (error) throw error;
      setSuccess(true);
      setTimeout(() => router.push("/dashboard"), 1000);
    } catch (e) {
      setError((e as Error).message || "Failed to create recipe.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-orange-50 py-10 px-4">
        <div className="bg-white rounded-xl shadow p-8 w-full max-w-lg">
          <Skeleton className="h-8 w-2/3 mb-6" />
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-6 w-full mb-4" />
          ))}
          <Skeleton className="h-10 w-full mt-6" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-orange-50 py-10 px-4">
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
      <div className="bg-white rounded-xl shadow p-8 w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">Add New Recipe</h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Title</label>
            <input
              type="text"
              className="w-full border border-orange-200 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Ingredients</label>
            <textarea
              className="w-full border border-orange-200 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={ingredients}
              onChange={e => setIngredients(e.target.value)}
              rows={3}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Instructions</label>
            <textarea
              className="w-full border border-orange-200 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={instructions}
              onChange={e => setInstructions(e.target.value)}
              rows={4}
              required
            />
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-gray-700 font-medium mb-2">Cooking Time (min)</label>
              <input
                type="number"
                className="w-full border border-orange-200 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                value={cookingTime}
                onChange={e => setCookingTime(e.target.value)}
                min={1}
                required
              />
            </div>
            <div className="flex-1">
              <label className="block text-gray-700 font-medium mb-2">Difficulty</label>
              <select
                className="w-full border border-orange-200 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                value={difficulty}
                onChange={e => setDifficulty(e.target.value)}
                required
              >
                {difficulties.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Category</label>
            {categoriesLoading ? (
              <div className="text-gray-500">Loading categories...</div>
            ) : categoriesError ? (
              <div className="text-red-600">Failed to load categories: {categoriesError}</div>
            ) : (
              <select
                className="w-full border border-orange-200 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                value={category}
                onChange={e => setCategory(e.target.value)}
                required
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            )}
          </div>
          {error && <div className="text-red-600 text-center">{error}</div>}
          {success && <div className="text-green-600 text-center">Recipe created!</div>}
          <button
            type="submit"
            className="w-full bg-orange-600 text-white py-2 rounded font-semibold hover:bg-orange-700 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500"
            disabled={isLoading}
          >
            {isLoading ? "Creating..." : "Create Recipe"}
          </button>
        </form>
      </div>
    </div>
  );
} 