import { useState, useEffect } from "react";

const habits = {
  "Mental & Strategic Training": [
    "Meditation (10 mins)",
    "Journaling (5 mins)",
    "Logic Puzzles / Strategic Thinking",
    "Read a Core Book",
  ],
  "Physical Fitness": [
    "Strength Training",
    "Martial Arts Practice",
    "Cardio / HIIT / Running",
  ],
  "Knowledge Expansion": ["30 mins Deep Learning", "Weekly Concept Mastered"],
  "Social Stealth & Observation": [
    "Social Dynamics Observation",
    "Listening > Talking",
    "Weekly Reflection",
  ],
  "Detachment & Inner Strength": [
    "Solo Time (No phone/music)",
    "Pushed Comfort Zone",
  ],
};

export default function HabitTracker() {
  const [tracker, setTracker] = useState(() => {
    const saved = localStorage.getItem("habit-tracker");
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem("habit-tracker", JSON.stringify(tracker));
  }, [tracker]);

  const toggleCheck = (section, habit, day) => {
    const key = `${section}-${habit}-${day}`;
    setTracker((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-center text-red-600 mb-6">
        To Become an Unstoppable Beast - Habit Tracker
      </h1>
      {Object.entries(habits).map(([section, sectionHabits]) => (
        <div key={section} className="mb-8">
          <h2 className="text-xl font-semibold text-blue-800 mb-2">
            {section}
          </h2>
          <div className="overflow-x-auto">
            <table className="table-auto w-full border">
              <thead>
                <tr>
                  <th className="border px-2 py-1 text-left">Habit</th>
                  {days.map((day) => (
                    <th key={day} className="border px-2 py-1">
                      {day}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sectionHabits.map((habit) => (
                  <tr key={habit}>
                    <td className="border px-2 py-1">{habit}</td>
                    {days.map((day) => {
                      const key = `${section}-${habit}-${day}`;
                      return (
                        <td key={day} className="border px-2 py-1 text-center">
                          <input
                            type="checkbox"
                            checked={tracker[key] || false}
                            onChange={() => toggleCheck(section, habit, day)}
                          />
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}
