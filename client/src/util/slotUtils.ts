export function parseTime(timeString: string) {
  const date = new Date(timeString);
  if (Number.isNaN(date.getTime())) {
    throw new Error(`Invalid time string: ${timeString}`);
  }

  return date;
}

export function getFormattedTime(timeString: string) {
  const time = parseTime(timeString);

  const format = time.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return format;
}

export function getTimeDifference(startTime: string, endTime: string) {
  const start = parseTime(startTime);
  const end = parseTime(endTime);

  const diffInMs = end.getTime() - start.getTime();

  // Convert milliseconds to hours and minutes
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInMinutes = Math.floor((diffInMs % (1000 * 60 * 60)) / (1000 * 60));
  const diffInSeconds = Math.floor((diffInMs % (1000 * 60)) / 1000);

  return { hours: diffInHours, minutes: diffInMinutes, seconds: diffInSeconds };
}

export function getProgressPercentage(
  currentToken: number,
  bookedCount: number,
) {
  if (bookedCount <= 0) return 0;
  const percent = Math.round((currentToken / bookedCount) * 100);
  return Math.min(100, Math.max(0, percent));
}
