import React from 'react';

function ThirtyDayTracker({ habit, onHabitUpdate }) {
  if (!habit) return null;

  const habitName = habit.name || 'Your Micro-Habit';
  const progressList = Array.isArray(habit.progress) ? habit.progress : [];

  const days = Array.from({ length: 30 }, (_, index) => {
    const dayNumber = index + 1;
    const dayData = progressList.find((p) => p.day === dayNumber) || {
      day: dayNumber,
      completed: false,
    };
    return dayData;
  });

  const completedCount = days.filter((d) => d.completed).length;

  return (
    <div className="tracker-container">
      <header className="tracker-header">
        <h2 className="habit-title">{habitName}</h2>
        <div className="progress-summary">
          <span>Progress: <strong>{completedCount} / 30</strong> days completed</span>
          <div className="progress-bar-container">
            <div
              className="progress-bar-fill"
              style={{ width: `${(completedCount / 30) * 100}%` }}
            ></div>
          </div>
        </div>
      </header>

      <div className="days-grid">
        {days.map((day) => (
          <div
            key={day.day}
            className={`day-card ${day.completed ? 'completed' : 'pending'}`}
          >
            <span className="day-number">Day {day.day}</span>
            <span className="day-status">
              {day.completed ? '✓ Done' : 'Pending'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ThirtyDayTracker;
