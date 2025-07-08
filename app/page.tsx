"use client";
import Navigation from "../components/navigation";
import Hero from "../components/hero";
import Footer from "../components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      <Navigation />

      <Hero />

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-500 to-red-500">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Share Your First Recipe?
          </h2>
          <p className="text-xl text-orange-100 mb-8">
            Join our community of passionate food lovers and start sharing your culinary creations today.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
