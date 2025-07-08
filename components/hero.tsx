import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Share Your
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">
                Culinary Magic
              </span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Join our community of passionate food lovers and start sharing your delicious recipes today. 
              Create your account and begin your culinary journey with us.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/signup" className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-center">
                Start Creating
              </Link>
              <Link href="/login" className="border-2 border-orange-500 text-orange-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-orange-500 hover:text-white transition-all duration-200 text-center">
                Sign In
              </Link>
            </div>
            <div className="flex items-center space-x-8 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>10,000+ Recipes</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>5,000+ Chefs</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span>50+ Categories</span>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="relative z-10">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="bg-white rounded-2xl p-4 shadow-lg transform rotate-3 hover:rotate-0 transition-transform duration-300">
                    <div className="w-full h-32 bg-gradient-to-br from-orange-200 to-red-200 rounded-xl mb-3"></div>
                    <h3 className="font-semibold text-gray-800">Spicy Tacos</h3>
                    <p className="text-sm text-gray-600">By Chef Maria</p>
                  </div>
                  <div className="bg-white rounded-2xl p-4 shadow-lg transform -rotate-2 hover:rotate-0 transition-transform duration-300">
                    <div className="w-full h-32 bg-gradient-to-br from-green-200 to-blue-200 rounded-xl mb-3"></div>
                    <h3 className="font-semibold text-gray-800">Fresh Salad</h3>
                    <p className="text-sm text-gray-600">By Chef Alex</p>
                  </div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="bg-white rounded-2xl p-4 shadow-lg transform -rotate-1 hover:rotate-0 transition-transform duration-300">
                    <div className="w-full h-32 bg-gradient-to-br from-purple-200 to-pink-200 rounded-xl mb-3"></div>
                    <h3 className="font-semibold text-gray-800">Chocolate Cake</h3>
                    <p className="text-sm text-gray-600">By Chef Sarah</p>
                  </div>
                  <div className="bg-white rounded-2xl p-4 shadow-lg transform rotate-2 hover:rotate-0 transition-transform duration-300">
                    <div className="w-full h-32 bg-gradient-to-br from-yellow-200 to-orange-200 rounded-xl mb-3"></div>
                    <h3 className="font-semibold text-gray-800">Pasta Carbonara</h3>
                    <p className="text-sm text-gray-600">By Chef Marco</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-orange-100 to-red-100 rounded-3xl transform rotate-6 scale-105 opacity-20"></div>
          </div>
        </div>
      </div>
    </section>
  );
} 