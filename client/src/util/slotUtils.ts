export function getFormattedTime(timeString: string) {
  const time = new Date(timeString);

  const format = time.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return format;
}

export function getTimeDifference(startTime: string, endTime: string) {
  const start = new Date(startTime);
  const end = new Date(endTime);

  const diffInMs = end.getTime() - start.getTime();

  // Convert milliseconds to hours and minutes
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInMinutes = Math.floor((diffInMs % (1000 * 60 * 60)) / (1000 * 60));

  return { hours: diffInHours, minutes: diffInMinutes };
}

export function getProgressPercentage(
  currentToken: number,
  bookedCount: number,
) {
  if (bookedCount === 0) return 0;

  return Math.round((currentToken / bookedCount) * 100);
}
