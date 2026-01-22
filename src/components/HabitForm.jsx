import React, { useState } from "react";

export default function HabitForm({ addHabit }) {
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    addHabit(name);
    setName("");
  };

  return (
    <form className="habit-form" onSubmit={handleSubmit}>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Add a habit (e.g., Read 30 mins)"
      />
      <button type="submit">Add</button>
    </form>
  );
}
