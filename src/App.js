import React, { useState, useEffect } from 'react';
import { fetchCurrentHabit } from './api';
import LoadingIndicator from './components/LoadingIndicator';
import HabitForm from './components/HabitForm';
import ThirtyDayTracker from './components/ThirtyDayTracker';
import './App.css';

function App() {
  const [habit, setHabit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadHabit = async () => {
    setLoading(true);
    setError(null);
    try {
      const habitData = await fetchCurrentHabit();
      setHabit(habitData);
    } catch (err) {
      setError('Unable to load habit data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHabit();
  }, []);

  const handleHabitCreated = (newHabit) => {
    setHabit(newHabit);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Micro-Habit Tracker</h1>
      </header>

      <main className="app-content">
        {loading ? (
          <LoadingIndicator message="Loading habit data..." />
        ) : error ? (
          <div className="error-container">
            <p className="error-text">{error}</p>
            <button onClick={loadHabit} className="retry-btn">
              Retry
            </button>
          </div>
        ) : habit ? (
          <ThirtyDayTracker habit={habit} onHabitUpdate={setHabit} />
        ) : (
          <HabitForm onHabitCreated={handleHabitCreated} />
        )}
      </main>
    </div>
  );
}

export default App;
