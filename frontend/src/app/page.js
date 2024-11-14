"use client";
import React from "react";
import Link from "next/link";

const LandingPage = () => {
  return (
    <div className="bg-black text-white">

      {/* Hero Section */}
      <section className="hero h-[70svh] flex flex-col justify-center items-center text-center px-6 relative bg-cover bg-center relative" style={{ backgroundImage: "url('/images/hero-image.png')" }}>
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-black opacity-55 z-10"></div>

        <div className="relative z-20 space-y-6">
          <h1 className="text-5xl font-bold leading-tight sm:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-600">
            Build your dream store effortlessly
          </h1>
          <p className="text-lg sm:text-xl max-w-2xl mx-auto mb-6">
            Create a professional online store in minutes. No code required.
          </p>
          <Link href="/products">
            <button className="px-8 py-3 bg-gradient-to-r from-pink-500 to-blue-500 text-white font-semibold rounded-lg hover:bg-pink-600 transition duration-200 transform hover:scale-105">
              Start Shopping
            </button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto text-center space-y-10">
          <h2 className="text-3xl font-bold text-white">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="bg-black p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
              <h3 className="text-xl font-semibold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-600">
                Fast Setup
              </h3>
              <p className="text-gray-400">Launch your store in minutes with our easy-to-use platform.</p>
            </div>
            <div className="bg-black p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
              <h3 className="text-xl font-semibold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-600">
                Customizable Themes
              </h3>
              <p className="text-gray-400">Choose from a variety of professionally designed themes and make it your own.</p>
            </div>
            <div className="bg-black p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
              <h3 className="text-xl font-semibold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-600">
                Secure Payments
              </h3>
              <p className="text-gray-400">Our platform supports secure payment gateways to ensure your customers are safe.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-center">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold mb-4">Ready to get started?</h2>
          <p className="text-lg mb-8">Create your online store today and take your business to the next level.</p>
          <Link href="/products">
            <button className="px-8 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition duration-200 transform hover:scale-105">
              Start Your Journey
            </button>
          </Link>
        </div>
      </section>

    </div>
  );
};

export default LandingPage;
