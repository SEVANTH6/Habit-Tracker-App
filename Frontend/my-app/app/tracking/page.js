"use client";
import { useState, useEffect } from "react";

export default function HabitTracker() {
  const [habits, setHabits] = useState({
    water: 0, // Glasses of water
    sleep: { sleepTime: "", wakeTime: "" }, // Sleep & Wake times
    workout: 0, // Workout in minutes
  });

  useEffect(() => {
    const storedHabits = JSON.parse(localStorage.getItem("habits"));
    if (storedHabits) setHabits(storedHabits);
  }, []);

  const handleWaterChange = (amount) => {
    const newWater = Math.max(0, Math.min(8, habits.water + amount)); // Limit between 0-8
    updateHabit({ ...habits, water: newWater });
  };

  const handleSleepChange = (e) => {
    updateHabit({ ...habits, sleep: { ...habits.sleep, [e.target.name]: e.target.value } });
  };

  const handleWorkoutChange = (e) => {
    updateHabit({ ...habits, workout: Math.max(0, e.target.value) });
  };

  const updateHabit = (newHabits) => {
    setHabits(newHabits);
    localStorage.setItem("habits", JSON.stringify(newHabits));
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6">
      <h2 className="text-3xl font-bold mb-6">Habit Tracker</h2>

      {/* Water Intake */}
      <div className="w-full max-w-md bg-white p-4 rounded-lg shadow-md mb-4">
        <h3 className="text-xl font-semibold">💧 Water Intake</h3>
        <p className="mt-2 text-gray-600">Glasses Drunk: {habits.water}/8</p>
        <div className="flex mt-2">
          <button onClick={() => handleWaterChange(-1)} className="bg-red-500 text-white px-3 py-1 rounded mx-1">-</button>
          <button onClick={() => handleWaterChange(1)} className="bg-blue-500 text-white px-3 py-1 rounded mx-1">+</button>
        </div>
      </div>

      {/* Sleep & Wake Time */}
      <div className="w-full max-w-md bg-white p-4 rounded-lg shadow-md mb-4">
        <h3 className="text-xl font-semibold">😴 Sleep Schedule</h3>
        <div className="mt-2">
          <label className="block text-gray-600">Sleep Time:</label>
          <input type="time" name="sleepTime" value={habits.sleep.sleepTime} onChange={handleSleepChange} className="w-full p-2 border rounded" />
        </div>
        <div className="mt-2">
          <label className="block text-gray-600">Wake Time:</label>
          <input type="time" name="wakeTime" value={habits.sleep.wakeTime} onChange={handleSleepChange} className="w-full p-2 border rounded" />
        </div>
      </div>

      {/* Workout Time */}
      <div className="w-full max-w-md bg-white p-4 rounded-lg shadow-md mb-4">
        <h3 className="text-xl font-semibold">🏋️ Workout</h3>
        <input type="number" value={habits.workout} onChange={handleWorkoutChange} className="w-full p-2 border rounded mt-2" placeholder="Minutes" />
      </div>
    </div>
  );
}
