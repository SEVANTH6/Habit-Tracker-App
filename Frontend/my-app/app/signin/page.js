"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [message, setMessage] = useState("");
  const router = useRouter();

  const onSubmit = async (data) => {
    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (response.ok) {
        setMessage("Login successful!");
        setTimeout(() => {
          router.push("/dashboard"); // Redirect to dashboard after login
        }, 1500);
      } else {
        setMessage(result.error || "Invalid email or password!");
      }
    } catch (error) {
      setMessage("Error connecting to server.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      {/* Navbar */}
      <nav className="w-full bg-blue-600 text-white py-4 px-8 flex justify-between items-center shadow-md">
        <h1 className="text-2xl font-bold">Habit Tracker</h1>
        <Link href="/register" className="px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-gray-200">
          Register
        </Link>
      </nav>

      {/* Sign In Form */}
      <div className="flex flex-col justify-center items-center flex-grow text-center px-6">
        <div className="bg-white p-6 rounded-lg shadow-md w-96">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Sign In</h2>

          <form onSubmit={handleSubmit(onSubmit)}>
            <label className="block mb-2 text-gray-700">Email</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="w-full p-2 border rounded"
            />
            {errors.email && <p className="text-red-500">{errors.email.message}</p>}

            <label className="block mt-4 mb-2 text-gray-700">Password</label>
            <input
              type="password"
              {...register("password", { required: "Password is required" })}
              className="w-full p-2 border rounded"
            />
            {errors.password && <p className="text-red-500">{errors.password.message}</p>}

            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 mt-4 rounded hover:bg-blue-600"
            >
              Sign In
            </button>
          </form>

          {message && <p className="mt-4 text-gray-700">{message}</p>}

          <p className="mt-4 text-gray-700">
            Don't have an account?{" "}
            <Link href="/register" className="text-blue-600 hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full py-4 bg-gray-200 text-center text-gray-600">
        © 2025 Habit Tracker | Stay Consistent, Stay Motivated
      </footer>
    </div>
  );
}
