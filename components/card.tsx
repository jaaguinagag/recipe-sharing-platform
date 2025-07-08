import React from "react";

interface CardProps {
  title: string;
  ingredients: string;
  instructions: string;
  cookingTime: number;
  difficulty: string;
  category: string;
  authorFullName: string;
}

export function Card({ title, ingredients, instructions, cookingTime, difficulty, category, authorFullName }: CardProps) {
  return (
    <div className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition-shadow duration-200 border border-orange-100">
      <h2 className="text-xl font-semibold mb-2 text-orange-700">{title}</h2>
      <div className="mb-2">
        <span className="font-semibold">Category:</span> {category}
      </div>
      <div className="mb-2">
        <span className="font-semibold">Difficulty:</span> {difficulty}
      </div>
      <div className="mb-2">
        <span className="font-semibold">Cooking Time:</span> {cookingTime} min
      </div>
      <div className="mb-2">
        <span className="font-semibold">Ingredients:</span>
        <div className="text-gray-700 whitespace-pre-line">{ingredients}</div>
      </div>
      <div className="mb-2">
        <span className="font-semibold">Instructions:</span>
        <div className="text-gray-700 whitespace-pre-line">{instructions}</div>
      </div>
      <div className="text-sm text-gray-500 mt-2">By {authorFullName}</div>
    </div>
  );
} 