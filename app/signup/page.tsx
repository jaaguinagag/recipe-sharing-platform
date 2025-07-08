"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { AuthForm } from "../../components/auth-wizard/auth-form";
import Link from "next/link";
import { supabase } from "../../lib/supabase-client";

export default function SignupPage() {
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleSuccess = async () => {
    setSuccess(true);
    // Sign out the user after successful signup to ensure they need to log in
    await supabase.auth.signOut();
    setTimeout(() => {
      router.push("/login");
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="absolute top-6 left-6">
        <Link
          href="/"
          className="flex items-center space-x-2 text-gray-600 hover:text-orange-600 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span>Go Back</span>
        </Link>
      </div>
      
      <h1 className="text-2xl font-bold mb-6">Sign Up</h1>
      {success ? (
        <div className="text-green-600 font-semibold text-center">
          User created successfully! Redirecting to login...
        </div>
      ) : (
        <AuthForm mode="sign-up" onSuccess={handleSuccess} />
      )}
    </div>
  );
} 