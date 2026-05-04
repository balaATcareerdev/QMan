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

  const expired = diffInMs < 0;

  const absDiffInMs = Math.abs(diffInMs);

  // Convert milliseconds to hours and minutes
  const diffInHours = Math.floor(absDiffInMs / (1000 * 60 * 60));
  const diffInMinutes = Math.floor(
    (absDiffInMs % (1000 * 60 * 60)) / (1000 * 60),
  );
  const diffInSeconds = Math.floor((absDiffInMs % (1000 * 60)) / 1000);

  return {
    hours: diffInHours,
    minutes: diffInMinutes,
    seconds: diffInSeconds,
    expired,
  };
}

export function getProgressPercentage(
  currentToken: number,
  bookedCount: number,
) {
  if (bookedCount <= 0) return 0;
  const percent = Math.round((currentToken / bookedCount) * 100);
  return Math.min(100, Math.max(0, percent));
}

export const hexToRgba = (hex: string, alpha: number) => {
  if (!/^#[0-9a-fA-F]{6}$/.test(hex)) {
    console.warn(`hexToRgba: invalid hex color "${hex}"`);
    return `rgba(0, 0, 0, ${alpha})`;
  }
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};
