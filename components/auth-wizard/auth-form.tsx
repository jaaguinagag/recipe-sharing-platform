"use client";
import { useState } from "react";
import { z } from "zod";
import { supabase } from "../../lib/supabase-client";

type AuthMode = "sign-in" | "sign-up";

interface AuthFormProps {
  mode: AuthMode;
  onSuccess?: () => void;
}

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const signUpSchema = signInSchema.extend({
  confirmPassword: z.string().min(6),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export function AuthForm({ mode, onSuccess }: AuthFormProps) {
  const [form, setForm] = useState({ email: "", password: "", confirmPassword: "" });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (mode === "sign-in") {
      const result = signInSchema.safeParse(form);
      if (!result.success) {
        setError("Please enter a valid email and password.");
        return;
      }
      setIsLoading(true);
      const { error } = await supabase.auth.signInWithPassword({
        email: form.email,
        password: form.password,
      });
      setIsLoading(false);
      if (error) setError(error.message);
      else {
        setForm({ email: "", password: "", confirmPassword: "" });
        onSuccess?.();
      }
    } else {
      const result = signUpSchema.safeParse(form);
      if (!result.success) {
        setError(result.error.errors[0]?.message || "Invalid input.");
        return;
      }
      setIsLoading(true);
      const { data, error } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
      });
      if (error) {
        setIsLoading(false);
        setError(error.message);
        return;
      }
      // Insert into Profile table
      if (data.user) {
        const userId = data.user.id;
        const userName = form.email.split("@")[0];
        await supabase.from("Profile").insert({
          id: userId,
          user_name: userName,
          full_name: ""
        });
      }
      setIsLoading(false);
      setForm({ email: "", password: "", confirmPassword: "" });
      onSuccess?.();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-sm mx-auto" aria-label={mode === "sign-in" ? "Sign in form" : "Sign up form"}>
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        className="w-full px-3 py-2 border rounded"
        required
        autoComplete="email"
        aria-label="Email"
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        className="w-full px-3 py-2 border rounded"
        required
        autoComplete={mode === "sign-in" ? "current-password" : "new-password"}
        aria-label="Password"
      />
      {mode === "sign-up" && (
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={form.confirmPassword}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          required
          autoComplete="new-password"
          aria-label="Confirm Password"
        />
      )}
      {error && <div className="text-red-600" role="alert">{error}</div>}
      <button
        type="submit"
        className="w-full bg-orange-600 text-white py-2 rounded"
        disabled={isLoading}
        aria-busy={isLoading}
      >
        {isLoading
          ? mode === "sign-in"
            ? "Signing in..."
            : "Signing up..."
          : mode === "sign-in"
          ? "Sign In"
          : "Sign Up"}
      </button>
    </form>
  );
} 