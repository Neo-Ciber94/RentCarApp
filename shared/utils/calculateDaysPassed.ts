const DAY_TO_MILLISECONDS = 1000 * 60 * 60 * 24;

export function calculateDaysPassed(from: Date, to?: Date | null | undefined) {
  const toDate = to ? new Date(to) : new Date();
  const millisecondsPassed = toDate.getTime() - new Date(from).getTime();
  return Math.max(0, millisecondsPassed / DAY_TO_MILLISECONDS);
}
