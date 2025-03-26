"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [message, setMessage] = useState("");

  const onSubmit = async (data) => {
    try {
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (response.ok) {
        setMessage("Registration successful! Please log in.");
      } else {
        setMessage(result.error || "Something went wrong!");
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
        <Link href="/signin" className="px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-gray-200">
          Login
        </Link>
      </nav>

      {/* Registration Form */}
      <div className="flex flex-col justify-center items-center flex-grow text-center px-6">
        <div className="bg-white p-6 rounded-lg shadow-md w-96">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Register</h2>

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
              {...register("password", { required: "Password is required", minLength: { value: 6, message: "At least 6 characters" } })}
              className="w-full p-2 border rounded"
            />
            {errors.password && <p className="text-red-500">{errors.password.message}</p>}

            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 mt-4 rounded hover:bg-blue-600"
            >
              Register
            </button>
          </form>

          {message && <p className="mt-4 text-gray-700">{message}</p>}

          <p className="mt-4 text-gray-700">
            Already have an account?{" "}
            <Link href="/signin" className="text-blue-600 hover:underline">
              Sign In
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
