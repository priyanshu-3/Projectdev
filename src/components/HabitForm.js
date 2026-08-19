import React, { useState } from 'react';
import { createHabit } from '../api';

function HabitForm({ onHabitCreated }) {
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
      <h2>Define Your Micro-Habit</h2>
      <p className="form-description">
        Start small. Choose a simple daily action you can complete in under 2 minutes.
      </p>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit} className="habit-form">
        <div className="form-group">
          <label htmlFor="habit-name">Habit Name</label>
          <input
            id="habit-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., Read 1 page of a book"
            disabled={loading}
            required
          />
        </div>

        <button type="submit" className="submit-btn" disabled={loading || !name.trim()}>
          {loading ? 'Creating...' : 'Start 30-Day Tracker'}
        </button>
      </form>
    </div>
  );
}

export default HabitForm;
