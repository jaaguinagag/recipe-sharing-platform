"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "../../../lib/supabase-client";
import { Skeleton } from "../../../components/skeleton";

interface Recipe {
  id: string;
  title: string;
  ingredients: string;
  instructions: string;
  cooking_time: number;
  difficulty: string;
  category: string;
  user_id: string;
  Profile?: { full_name: string };
}

export default function RecipeDetailPage() {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    async function fetchRecipe() {
      try {
        const { data, error } = await supabase
          .from("Recipe")
          .select(`id, title, ingredients, instructions, cooking_time, difficulty, category, user_id, Profile:Profile!inner(full_name)`)
          .eq("id", id)
          .single();
        console.log('Recipe detail data:', data);
        if (error) throw error;
        setRecipe(data ? { ...data, Profile: Array.isArray(data.Profile) ? data.Profile[0] : data.Profile } : null);
        setHasError(false);
      } catch {
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    }
    if (id) fetchRecipe();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-orange-50 py-10 px-4">
        <div className="bg-white rounded-xl shadow p-8 w-full max-w-lg">
          <Skeleton className="h-8 w-2/3 mb-6" />
          <Skeleton className="h-4 w-1/3 mb-2" />
          <Skeleton className="h-4 w-1/4 mb-2" />
          <Skeleton className="h-4 w-1/2 mb-4" />
          <Skeleton className="h-20 w-full mb-4" />
          <Skeleton className="h-20 w-full mb-4" />
          <Skeleton className="h-4 w-1/3" />
        </div>
      </div>
    );
  }
  if (hasError || !recipe) {
    return <div className="flex justify-center items-center min-h-screen text-red-600">Failed to load recipe.</div>;
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
        <h1 className="text-2xl font-bold mb-6 text-center text-orange-700">{recipe.title}</h1>
        <div className="mb-2"><span className="font-semibold">Category:</span> {recipe.category}</div>
        <div className="mb-2"><span className="font-semibold">Difficulty:</span> {recipe.difficulty}</div>
        <div className="mb-2"><span className="font-semibold">Cooking Time:</span> {recipe.cooking_time} min</div>
        <div className="mb-2"><span className="font-semibold">Ingredients:</span>
          <div className="text-gray-700 whitespace-pre-line">{recipe.ingredients}</div>
        </div>
        <div className="mb-2"><span className="font-semibold">Instructions:</span>
          <div className="text-gray-700 whitespace-pre-line">{recipe.instructions}</div>
        </div>
        <div className="text-sm text-gray-500 mt-2">By {recipe.Profile?.full_name ?? 'Unknown'}</div>
      </div>
    </div>
  );
} 