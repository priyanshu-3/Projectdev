export async function fetchCurrentHabit() {
  try {
    const response = await fetch('/api/habits/current');
    if (response.status === 404) {
      return null;
    }
    if (!response.ok) {
      throw new Error(`Failed to fetch habit: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    if (error.message.includes('404')) {
      return null;
    }
    throw error;
  }
}
