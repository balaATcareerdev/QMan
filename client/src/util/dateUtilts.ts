export function formatDate(date: Date, format: string): string {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const shortMonths = months.map((m) => m.slice(0, 3));

  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const shortWeekdays = weekdays.map((d) => d.slice(0, 3));

  const replacements: Record<string, string> = {
    yyyy: date.getFullYear().toString(),
    yy: date.getFullYear().toString().slice(-2),

    MMMM: months[date.getMonth()],
    MMM: shortMonths[date.getMonth()],
    MM: String(date.getMonth() + 1).padStart(2, "0"),
    M: String(date.getMonth() + 1),

    dddd: weekdays[date.getDay()],
    ddd: shortWeekdays[date.getDay()],
    dd: String(date.getDate()).padStart(2, "0"),
    d: String(date.getDate()),
  };

  return format.replace(
    /yyyy|yy|MMMM|MMM|MM|M|dddd|ddd|dd|d/g,
    (match) => replacements[match],
  );
}

export function formatTime(date: Date, format: string): string {
  const replacements: Record<string, string> = {
    HH: String(date.getHours()).padStart(2, "0"),
    H: String(date.getHours()),

    hh: String(date.getHours() % 12 || 12).padStart(2, "0"),
    h: String(date.getHours() % 12 || 12),

    mm: String(date.getMinutes()).padStart(2, "0"),
    ss: String(date.getSeconds()).padStart(2, "0"),

    A: date.getHours() >= 12 ? "PM" : "AM",
    a: date.getHours() >= 12 ? "pm" : "am",
  };

  return format.replace(/HH|H|hh|h|mm|ss|A|a/g, (match) => replacements[match]);
}

export function getMeridiem(date: string | Date): "AM" | "PM" {
  const hours = new Date(date).getHours();
  return hours >= 12 ? "PM" : "AM";
}

export function getEndTimeStatus(startTime: Date, endTime: Date) {
  const now = new Date();

  const start = new Date(startTime);
  const end = new Date(endTime);

  if (now < start) {
    return "Upcoming";
  }

  if (now >= start && now <= end) {
    return "Active";
  }

  return "OverTime";
}

/**
 * 
 * | Token  | Description              | Example  |
| ------ | ------------------------ | -------- |
| `d`    | Day of month             | `5`      |
| `dd`   | Day of month (2 digits)  | `05`     |
| `ddd`  | Short weekday            | `Mon`    |
| `dddd` | Full weekday             | `Monday` |
| `M`    | Month number             | `7`      |
| `MM`   | Month number (2 digits)  | `07`     |
| `MMM`  | Short month name         | `Jul`    |
| `MMMM` | Full month name          | `July`   |
| `yy`   | 2-digit year             | `26`     |
| `yyyy` | 4-digit year             | `2026`   |
| `H`    | Hour (24-hour)           | `9`      |
| `HH`   | Hour (24-hour, 2 digits) | `09`     |
| `h`    | Hour (12-hour)           | `9`      |
| `hh`   | Hour (12-hour, 2 digits) | `09`     |
| `mm`   | Minutes                  | `05`     |
| `ss`   | Seconds                  | `08`     |
| `A`    | AM/PM (uppercase)        | `PM`     |
| `a`    | am/pm (lowercase)        | `pm`     |

 */

export function getTimeRemaining(date: string | Date): string {
  const target = new Date(date);
  const now = new Date();

  const diff = target.getTime() - now.getTime();

  if (diff <= 0) {
    return "Service starting soon";
  }

  const totalMinutes = Math.floor(diff / (1000 * 60));

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours === 0) {
    return `${minutes} min${minutes !== 1 ? "s" : ""} remaining`;
  }

  return `${hours} hr${hours !== 1 ? "s" : ""} ${minutes} min${minutes !== 1 ? "s" : ""} remaining`;
}
