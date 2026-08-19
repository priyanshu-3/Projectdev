import React from 'react';

export default function ThirtyDayTracker({ habit }) {
  if (!habit) return null;

  const { name, progress = [] } = habit;
  const daysProgress = Array.isArray(progress) ? progress : [];

  const days = Array.from({ length: 30 }, (_, index) => {
    const dayNumber = index + 1;
    const isCompleted = daysProgress.includes(dayNumber);
    return { dayNumber, isCompleted };
  });

  const completedCount = days.filter((d) => d.isCompleted).length;
  const percentage = Math.round((completedCount / 30) * 100);

  return (
    <div className="tracker-container">
      <div className="tracker-header">
        <h2>{name}</h2>
        <div className="progress-summary">
          <span>{completedCount} / 30 Days Completed ({percentage}%)</span>
        </div>
      </div>

      <div className="progress-bar-bg">
        <div className="progress-bar-fill" style={{ width: `${percentage}%` }}></div>
      </div>

      <div className="days-grid">
        {days.map(({ dayNumber, isCompleted }) => (
          <div
            key={dayNumber}
            className={`day-card ${isCompleted ? 'completed' : ''}`}
          >
            <span className="day-number">Day {dayNumber}</span>
            <span className="day-status">{isCompleted ? '✓' : '—'}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
