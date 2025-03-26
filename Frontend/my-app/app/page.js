"use client";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      {/* Navbar */}
      <nav className="w-full bg-blue-600 text-white py-4 px-8 flex justify-between items-center shadow-md">
        <h1 className="text-2xl font-bold">Habit Tracker</h1>
        <div>
          <Link href="/signin" className="px-4 py-2 bg-white text-blue-600 rounded-lg mr-2 hover:bg-gray-200">
            Login
          </Link>
          <Link href="/register" className="px-4 py-2 bg-blue-800 text-white rounded-lg hover:bg-blue-700">
            Register
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex flex-col justify-center items-center flex-grow text-center px-6">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">
          Build Better Habits, Track Your Progress
        </h2>
        <p className="text-gray-700 text-lg mb-6">
          Join our habit tracking app to stay consistent and achieve your goals.
        </p>
        <Link href="/register" className="px-6 py-3 bg-blue-600 text-white text-lg rounded-lg hover:bg-blue-700">
          Get Started
        </Link>
      </div>

      {/* Footer */}
      <footer className="w-full py-4 bg-gray-200 text-center text-gray-600">
        © 2025 Habit Tracker | Stay Consistent, Stay Motivated
      </footer>
    </div>
  );
}
