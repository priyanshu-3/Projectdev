import React from 'react';

export default function HabitTracker({ habit }) {
  const habitName = habit?.name || habit?.title || 'Micro-Habit';
  const progress = habit?.progress || [];
  const totalDays = 30;

  const days = Array.from({ length: totalDays }, (_, index) => {
    const dayNum = index + 1;
    const progressItem = progress.find((p) => p.day === dayNum);
    return {
      day: dayNum,
      completed: progressItem ? progressItem.completed : false,
    };
  });

  return (
    <div className="tracker-container">
      <h2>{habitName}</h2>
      <p className="tracker-subtitle">30-Day Habit Tracker</p>
      <div className="grid">
        {days.map((day) => (
          <div
            key={day.day}
            className={`day-box ${day.completed ? 'completed' : ''}`}
          >
            <span className="day-number">Day {day.day}</span>
            <span className="status">{day.completed ? '✓' : ''}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
