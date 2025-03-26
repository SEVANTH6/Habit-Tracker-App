"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  // Check if user is logged in
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      router.push("/signin"); // Redirect to Sign In if not logged in
    } else {
      setUser(JSON.parse(storedUser));
    }
  }, [router]);

  // Logout Function
  const handleLogout = () => {
    localStorage.removeItem("user"); // Remove user session
    router.push("/signin"); // Redirect to Sign In
  };

  if (!user) {
    return <p className="text-center mt-10 text-gray-700">Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Navbar */}
      <nav className="w-full bg-blue-600 text-white py-4 px-8 flex justify-between items-center shadow-md">
        <h1 className="text-2xl font-bold">Habit Tracker</h1>
        <button onClick={handleLogout} className="px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-gray-200">
          Logout
        </button>
      </nav>

      {/* Dashboard Content */}
      <div className="flex-grow flex flex-col items-center justify-center text-center px-6">
        <h2 className="text-3xl font-bold text-gray-800">Welcome, {user.email}!</h2>
        <p className="text-gray-600 mt-2">Your habit tracking starts here 🚀</p>
      </div>

      {/* Footer */}
      <footer className="w-full py-4 bg-gray-200 text-center text-gray-600">
        © 2025 Habit Tracker | Stay Consistent, Stay Motivated
      </footer>
    </div>
  );
}
