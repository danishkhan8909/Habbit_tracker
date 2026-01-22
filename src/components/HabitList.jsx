import React from "react";
import HabitItem from "./HabitItem";

export default function HabitList({ habits, toggleComplete }) {
  if (!habits || habits.length === 0) {
    return <div className="empty">No habits yet — add one above!</div>;
  }
  return (
    <div className="habit-list">
      {habits.map((habit) => (
        <HabitItem key={habit.id} habit={habit} toggleComplete={toggleComplete} />
      ))}
    </div>
  );
}
