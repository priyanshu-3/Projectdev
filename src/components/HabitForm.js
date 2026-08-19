import React, { useState } from 'react';

export default function HabitForm({ onHabitCreated }) {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/habits', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim() }),
      });

      if (!response.ok) {
        throw new Error('Failed to create habit');
      }

      const habit = await response.json();
      if (onHabitCreated) {
        onHabitCreated(habit);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="habit-form-container">
      <h2>Create a Micro-Habit</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="habit-name">Habit Name:</label>
          <input
            id="habit-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Read 1 page daily"
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit" disabled={loading}>
          {loading ? 'Creating...' : 'Create Habit'}
        </button>
      </form>
    </div>
  );
}
