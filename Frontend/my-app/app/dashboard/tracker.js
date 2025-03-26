"use client";
import { useState, useEffect } from "react";

export default function HabitTracker() {
  const [habits, setHabits] = useState({
    water: 0, // Glasses of water
    sleep: 0, // Hours of sleep
    workout: 0, // Minutes of workout
    reading: 0, // Minutes of reading
  });

  // Load from localStorage
  useEffect(() => {
    const storedHabits = JSON.parse(localStorage.getItem("habits"));
    if (storedHabits) {
      setHabits(storedHabits);
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("habits", JSON.stringify(habits));
  }, [habits]);

  // Update a habit
  const updateHabit = (habit, value) => {
    setHabits((prev) => ({ ...prev, [habit]: value }));
  };

  // Reset Habits
  const resetHabits = () => {
    setHabits({ water: 0, sleep: 0, workout: 0, reading: 0 });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      {/* Navbar */}
      <nav className="w-full bg-blue-600 text-white py-4 px-8 flex justify-between items-center shadow-md">
        <h1 className="text-2xl font-bold">Habit Tracker</h1>
      </nav>

      {/* Habit Tracker */}
      <div className="flex flex-col items-center flex-grow text-center px-6">
        <h2 className="text-3xl font-bold text-gray-800 mt-6">Track Your Habits</h2>

        {/* Habit Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {Object.entries(habits).map(([habit, value]) => (
            <div key={habit} className="bg-white p-6 rounded-lg shadow-md w-72">
              <h3 className="text-xl font-bold text-gray-800 capitalize">{habit}</h3>
              <input
                type="number"
                value={value}
                onChange={(e) => updateHabit(habit, parseInt(e.target.value) || 0)}
                className="w-full p-2 mt-2 border rounded text-center"
              />
            </div>
          ))}
        </div>

        {/* Reset Button */}
        <button
          onClick={resetHabits}
          className="mt-6 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
          Reset for Today
        </button>
      </div>

      {/* Footer */}
      <footer className="w-full py-4 bg-gray-200 text-center text-gray-600">
        © 2025 Habit Tracker | Stay Consistent, Stay Motivated
      </footer>
    </div>
  );
}
