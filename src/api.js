export async function fetchCurrentHabit() {
  const response = await fetch('/api/habits/current');
  if (response.status === 404) {
    return null;
  }
  if (!response.ok) {
    throw new Error(`Failed to fetch current habit: ${response.statusText}`);
  }
  return await response.json();
}

export async function createHabit(habitData) {
  const response = await fetch('/api/habits', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(habitData),
  });
  if (!response.ok) {
    throw new Error(`Failed to create habit: ${response.statusText}`);
  }
  return await response.json();
}
