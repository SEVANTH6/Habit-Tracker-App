"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// Validation Schema
const schema = yup.object().shape({
  email: yup.string().email("Invalid email format").required("Email is required"),
  password: yup.string().required("Password is required"),
});

export default function SignInForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

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
        localStorage.setItem("email", data.email);  // Store email
        setMessage("Login successful!");
        router.push("/tracking");  // Redirect to tracking page
      } else {
        setMessage(result.error || "Invalid credentials!");
      }
    } catch (error) {
      setMessage("Error connecting to server.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Sign In</h2>

        {/* Email Input */}
        <label className="block mb-2">Email</label>
        <input type="email" {...register("email")} className="w-full p-2 border rounded" />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}

        {/* Password Input */}
        <label className="block mt-4 mb-2">Password</label>
        <input type="password" {...register("password")} className="w-full p-2 border rounded" />
        {errors.password && <p className="text-red-500">{errors.password.message}</p>}

        {/* Submit Button */}
        <button type="submit" className="w-full bg-blue-500 text-white p-2 mt-4 rounded hover:bg-blue-600">
          Sign In
        </button>

        {/* Message Display */}
        {message && <p className="mt-4 text-center text-gray-700">{message}</p>}

        {/* Register Link */}
        <p className="mt-4 text-center">
          Don't have an account? <a href="/register" className="text-blue-600 underline">Register</a>
        </p>
      </form>
    </div>
  );
}
