import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { format } from "date-fns";

export default function App() {
  const [habits, setHabits] = useState(() => {
    const saved = localStorage.getItem("habits");
    return saved ? JSON.parse(saved) : [];
  });

  const [newHabit, setNewHabit] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingName, setEditingName] = useState("");

  useEffect(() => {
    localStorage.setItem("habits", JSON.stringify(habits));
  }, [habits]);

  const addHabit = () => {
    if (!newHabit.trim()) return;
    setHabits([
      ...habits,
      {
        id: uuidv4(),
        name: newHabit,
        streak: 0,
        completedDates: [],
        goal: 21,
      },
    ]);
    setNewHabit("");
  };

  const toggleComplete = (id) => {
    const today = format(new Date(), "yyyy-MM-dd");

    setHabits(
      habits.map((habit) => {
        if (habit.id === id) {
          if (!habit.completedDates.includes(today)) {
            return {
              ...habit,
              completedDates: [...habit.completedDates, today],
              streak: habit.streak + 1,
            };
          }
        }
        return habit;
      })
    );
  };

  const deleteHabit = (id) => {
    setHabits(habits.filter((habit) => habit.id !== id));
  };

  const startEdit = (habit) => {
    setEditingId(habit.id);
    setEditingName(habit.name);
  };

  const saveEdit = (id) => {
    setHabits(
      habits.map((habit) =>
        habit.id === id ? { ...habit, name: editingName } : habit
      )
    );
    setEditingId(null);
    setEditingName("");
  };

  const getBadge = (streak) => {
    if (streak >= 21) return "🥇 Gold";
    if (streak >= 7) return "🥈 Silver";
    if (streak >= 1) return "🥉 Bronze";
    return "";
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-4xl font-extrabold text-primary mb-2">
        Habit Tracker
      </h1>
      <p className="text-gray-600 mb-6">
        Check habits daily — keep your streak alive 
      </p>

      {/* Add Habit */}
      <div className="flex gap-2 w-full max-w-lg mb-8">
        <input
          type="text"
          value={newHabit}
          onChange={(e) => setNewHabit(e.target.value)}
          placeholder="Add a habit"
          className="flex-1 p-3 rounded-lg border"
        />
        <button
          onClick={addHabit}
          className="bg-primary text-white px-5 py-3 rounded-lg font-semibold"
        >
          Add
        </button>
      </div>

      {/* Habit List */}
      <div className="w-full max-w-lg space-y-4">
        {habits.map((habit) => {
          const today = format(new Date(), "yyyy-MM-dd");
          const isDone = habit.completedDates.includes(today);

          return (
            <div
              key={habit.id}
              className="bg-white p-4 rounded-xl shadow"
            >
              {/* Name / Edit */}
              {editingId === habit.id ? (
                <div className="flex gap-2 mb-2">
                  <input
                    value={editingName}
                    onChange={(e) => setEditingName(e.target.value)}
                    className="flex-1 p-2 border rounded"
                  />
                  <button
                    onClick={() => saveEdit(habit.id)}
                    className="bg-green-500 text-white px-3 rounded"
                  >
                    Save
                  </button>
                </div>
              ) : (
                <p className="text-lg font-bold">{habit.name}</p>
              )}

              <p className="text-gray-500 text-sm flex gap-2">
                 Streak: {habit.streak} {getBadge(habit.streak)}
              </p>

              {/* Progress */}
              <div className="w-full bg-gray-200 rounded-full h-2 my-2">
                <div
                  className="bg-primary h-2 rounded-full"
                  style={{
                    width: `${(habit.streak / habit.goal) * 100}%`,
                  }}
                />
              </div>

              {/* Actions */}
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => toggleComplete(habit.id)}
                  className={`px-4 py-2 rounded text-white ${
                    isDone ? "bg-green-600" : "bg-indigo-600"
                  }`}
                >
                  {isDone ? "Done" : "Mark"}
                </button>

                <button
                  onClick={() => startEdit(habit)}
                  className="px-4 py-2 rounded bg-yellow-400 text-white"
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteHabit(habit.id)}
                  className="px-4 py-2 rounded bg-red-500 text-white"
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <p className="mt-8 text-gray-400 text-sm">
        Data saved locally in browser (localStorage)
      </p>
    </div>
  );
}
