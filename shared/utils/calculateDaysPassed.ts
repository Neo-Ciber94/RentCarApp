const DAY_TO_MILLISECONDS = 1000 * 60 * 60 * 24;

export function calculateDaysPassed(date: Date) {
  const millisecondsPassed = Date.now() - new Date(date).getTime();
  return Math.min(0, millisecondsPassed / DAY_TO_MILLISECONDS);
}
