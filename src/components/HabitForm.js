import React, { useState } from 'react';
import { createHabit } from '../api';

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
      const newHabit = await createHabit({ name: name.trim() });
      if (onHabitCreated) {
        onHabitCreated(newHabit);
      }
    } catch (err) {
      setError(err.message || 'Failed to create habit');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="habit-form-container">
      <h2>Create Your Micro-Habit</h2>
      <p>Start small to build long-term consistency.</p>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit} className="habit-form">
        <div className="form-group">
          <label htmlFor="habitName">Habit Name</label>
          <input
            id="habitName"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., Read 5 pages daily"
            disabled={loading}
            required
          />
        </div>
        <button type="submit" disabled={loading || !name.trim()} className="btn-primary">
          {loading ? 'Creating...' : 'Start 30-Day Challenge'}
        </button>
      </form>
    </div>
  );
}
