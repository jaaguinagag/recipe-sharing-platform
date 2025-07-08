"use client";
import { useRouter } from "next/navigation";
import { AuthForm } from "../../components/auth-wizard/auth-form";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();

  const handleSuccess = () => {
    router.push("/dashboard");
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
      
      <h1 className="text-2xl font-bold mb-6">Sign In</h1>
      <AuthForm mode="sign-in" onSuccess={handleSuccess} />
    </div>
  );
} 