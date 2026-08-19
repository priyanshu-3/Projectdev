import React, { useState, useEffect } from 'react';
import { fetchCurrentHabit } from './api';
import LoadingIndicator from './components/LoadingIndicator';
import HabitForm from './components/HabitForm';
import HabitTracker from './components/HabitTracker';
import './App.css';

function App() {
  const [habit, setHabit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadHabit = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchCurrentHabit();
      setHabit(data);
    } catch (err) {
      console.error('Error fetching habit:', err);
      setError('Failed to load habit data. Please try again later.');
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
          <LoadingIndicator />
        ) : error ? (
          <div className="error-container">
            <p className="error-message">{error}</p>
            <button onClick={loadHabit}>Retry</button>
          </div>
        ) : habit ? (
          <HabitTracker habit={habit} />
        ) : (
          <HabitForm onHabitCreated={handleHabitCreated} />
        )}
      </main>
    </div>
  );
}

export default App;
