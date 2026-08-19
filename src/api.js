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
