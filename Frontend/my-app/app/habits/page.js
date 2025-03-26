"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function HabitTracker() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is logged in
    const loggedInUser = localStorage.getItem("user");
    if (!loggedInUser) {
      router.push("/signin");
    } else {
      setUser(JSON.parse(loggedInUser));
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-6">Track Your Habits</h1>
      <div className="grid grid-cols-2 gap-6">
        {[
          { name: "Water Intake", route: "/habits/water" },
          { name: "Sleep", route: "/habits/sleep" },
          { name: "Workout", route: "/habits/workout" },
          { name: "Reading Time", route: "/habits/reading" },
        ].map((habit) => (
          <button
            key={habit.route}
            onClick={() => router.push(habit.route)}
            className="bg-blue-500 text-white p-6 rounded-lg shadow-md hover:bg-blue-600 transition"
          >
            {habit.name}
          </button>
        ))}
      </div>
    </div>
  );
}
