import React from "react";

export default function StreakBadge({ streak }) {
  if (streak >= 30) return <span className="badge gold">🏆 30+ days</span>;
  if (streak >= 14) return <span className="badge silver">🥈 14 days</span>;
  if (streak >= 7) return <span className="badge bronze">🥉 7 days</span>;
  if (streak >= 3) return <span className="badge">🔥 {streak}</span>;
  return <span className="badge muted">—</span>;
}
