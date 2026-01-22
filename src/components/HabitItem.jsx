import React from "react";
import { format } from "date-fns";
import StreakBadge from "../StreakBadge";

export default function HabitItem({ habit, toggleComplete }) {
  const today = format(new Date(), "yyyy-MM-dd");
  const isDone = habit.completedDates.includes(today);

  return (
    <div className="habit-item">
      <div className="left">
        <button
          className={`mark ${isDone ? "done" : ""}`}
          onClick={() => toggleComplete(habit.id)}
          title={isDone ? "Unmark today" : "Mark done for today"}
        >
          {isDone ? "✅" : "○"}
        </button>
        <div className="meta">
          <div className="name">{habit.name}</div>
          <div className="small">Streak: <strong>{habit.streak}</strong></div>
        </div>
      </div>
      <div className="right">
        <StreakBadge streak={habit.streak} />
      </div>
    </div>
  );
}
