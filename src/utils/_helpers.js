// Calculates the maximum date age years ago from today
export function calculateMaxDate(age) {
  const today = new Date();
  return new Date(
    today.getFullYear() - parseInt(18),
    today.getMonth(),
    today.getDate()
  );
}

// Disables selection of previous dates in datetime input (up to the current moment)
export function disabledPreviousDateTime() {
  const today = new Date();
  const formattedDate = new Date(
    today.getTime() - today.getTimezoneOffset() * 60000
  )
    .toISOString()
    .slice(0, 16);
  return formattedDate;
}

// Disables selection of previous dates in date input (up to the current moment)
export function disabledPreviousDate() {
  const today = new Date();
  const formattedDate = new Date(
    today.getTime() - today.getTimezoneOffset() * 60000
  )
    .toISOString()
    .split("T")[0];

  return formattedDate;
}

// Extracts the date part (YYYY-MM-DD) from a datetime string
export function getDateFromString(dateTimeString) {
  const dateOnly = dateTimeString.substring(0, 10);
  return dateOnly;
}

// Calculates the difference in days between the target date and today
export function calculateDaysDifference(targetDate) {
  const today = new Date();
  const target = new Date(targetDate);
  const msPerDay = 1000 * 60 * 60 * 24;
  const difference = Math.floor((target - today) / msPerDay);
  return difference;
}

// Truncates text to a specified word limit and appends "..." if truncated
export const truncateText = (text, limit) => {
  const words = text.trim().split(/\s+/); // Trim and split by any whitespace
  return words.length > limit ? words.slice(0, limit).join(" ") + "..." : text;
};

export const formatDateTime = (timestamp) => {
  const dateObj = new Date(timestamp);

  // Extract year, month, and day
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const day = String(dateObj.getDate()).padStart(2, "0");

  // Extract hours and minutes
  const hours = String(dateObj.getHours()).padStart(2, "0");
  const minutes = String(dateObj.getMinutes()).padStart(2, "0");

  // Return in "YYYY-MM-DD HH:mm" format
  return `${year}-${month}-${day} ${hours}:${minutes}`;
};
