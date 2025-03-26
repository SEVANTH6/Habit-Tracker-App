"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

export default function SignInForm() {
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
        // Redirect user to dashboard or home page
      } else {
        setMessage(result.error || "Invalid credentials!");
      }
    } catch (error) {
      setMessage("Error connecting to server.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-blue-600 text-white p-4 shadow-md">
        <h1 className="text-2xl font-bold text-center">Habit Tracker</h1>
      </nav>

      {/* Sign-in Form */}
      <div className="flex justify-center items-center min-h-[calc(100vh-4rem)]">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white p-6 rounded-lg shadow-lg w-96"
        >
          <h2 className="text-3xl font-bold mb-4 text-center text-gray-900">
            Sign In
          </h2>

          <label className="block mb-2 text-gray-800">Email</label>
          <input
            type="email"
            {...register("email", { required: "Email is required" })}
            className="w-full p-2 border rounded text-gray-900"
          />
          {errors.email && (
            <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
          )}

          <label className="block mt-4 mb-2 text-gray-800">Password</label>
          <input
            type="password"
            {...register("password", { required: "Password is required" })}
            className="w-full p-2 border rounded text-gray-900"
          />
          {errors.password && (
            <p className="text-red-600 text-sm mt-1">
              {errors.password.message}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 mt-4 rounded hover:bg-blue-700 transition"
          >
            Sign In
          </button>

          {message && (
            <p className="mt-4 text-center text-gray-900 font-semibold">
              {message}
            </p>
          )}

          {/* Don't have an account? */}
          <p className="mt-4 text-center text-gray-800">
            Don't have an account?{" "}
            <span
              className="text-blue-600 cursor-pointer hover:underline"
              onClick={() => router.push("/")}
            >
              Register
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}
