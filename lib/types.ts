// Database types for Supabase tables

export interface Profile {
  id: string; // uuid
  user_name: string;
  full_name: string;
  created_at: string; // ISO timestamp
  updated_at: string; // ISO timestamp
}

export interface Recipe {
  id: string; // uuid
  created_at: string; // ISO timestamp
  user_id: string; // uuid, references Profile.id
  title: string;
  ingredients: string;
  instructions: string;
  cooking_time: number; // in minutes
  difficulty: string;
  category: string;
} 