"use client";
import { useEffect } from 'react';
import { supabase } from '../lib/supabase-client';

export default function Navigation() {
  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange(() => {
      // No-op
    });
    const timer = setTimeout(async () => {
      try {
        await supabase.auth.getSession();
      } catch {
        // No-op
      }
    }, 500);
    return () => {
      clearTimeout(timer);
      listener.subscription.unsubscribe();
    };
  }, []);

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-orange-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">T</span>
            </div>
            <span className="text-2xl font-bold text-gray-800">Tastely</span>
          </div>
          <div className="flex items-center space-x-8">
            <a href="#" className="text-gray-600 hover:text-orange-600 transition-colors">Browse Recipes</a>
            <a href="#" className="text-gray-600 hover:text-orange-600 transition-colors">Categories</a>
            <a href="#" className="text-gray-600 hover:text-orange-600 transition-colors">About</a>
          </div>
          <div className="flex items-center space-x-4">
            {/* No auth buttons for any user state */}
          </div>
        </div>
      </div>
    </nav>
  );
} 