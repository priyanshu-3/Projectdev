import React, { useState, useEffect, useCallback } from 'react';
import { fetchCurrentHabit } from './api';
import LoadingIndicator from './components/LoadingIndicator';
import HabitForm from './components/HabitForm';
import ThirtyDayTracker from './components/ThirtyDayTracker';
import './App.css';

export default function App() {
  const [habit, setHabit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadHabit = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchCurrentHabit();
      setHabit(data);
    } catch (err) {
      setError(err.message || 'Failed to load habit');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadHabit();
  }, [loadHabit]);

  const handleHabitCreated = (newHabit) => {
    setHabit(newHabit);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Micro-Habit Tracker</h1>
      </header>

      <main className="app-main">
        {loading && <LoadingIndicator />}

        {!loading && error && (
          <div className="error-container">
            <p className="error-message">{error}</p>
            <button onClick={loadHabit} className="btn-secondary">
              Retry
            </button>
          </div>
        )}

        {!loading && !error && (
          habit ? (
            <ThirtyDayTracker habit={habit} />
          ) : (
            <HabitForm onHabitCreated={handleHabitCreated} />
          )
        )}
      </main>
    </div>
  );
}
