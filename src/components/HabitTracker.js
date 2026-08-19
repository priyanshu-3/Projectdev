import React from 'react';

function HabitTracker({ habit }) {
  if (!habit) return null;

  const { name, progress = [] } = habit;

  return (
    <div className="habit-tracker">
      <h2>{name}</h2>
      <div className="tracker-grid">
        {Array.from({ length: 30 }, (_, index) => {
          const dayNumber = index + 1;
          const dayProgress = progress.find((p) => p.day === dayNumber);
          const isCompleted = dayProgress ? dayProgress.completed : false;

          return (
            <div
              key={dayNumber}
              className={`day-card ${isCompleted ? 'completed' : ''}`}
              data-testid={`day-${dayNumber}`}
            >
              <span className="day-label">Day {dayNumber}</span>
              <span className="day-status">{isCompleted ? '✓' : ''}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default HabitTracker;
