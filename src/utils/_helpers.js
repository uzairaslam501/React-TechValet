// Calculates the maximum date age years ago from today
export function calculateMaxDate(age) {
  const today = new Date();
  return new Date(
    today.getFullYear() - parseInt(18),
    today.getMonth(),
    today.getDate()
  );
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

//#region Text
// Truncates text to a specified word limit and appends "..." if truncated
export const truncateText = (text, limit) => {
  const words = text.trim().split(/\s+/); // Trim and split by any whitespace
  return words.length > limit ? words.slice(0, limit).join(" ") + "..." : text;
};

// Truncates Characters to a specified limit and appends "..." if truncated
export const truncateCharacters = (text, limit) => {
  return text.length > limit ? text.slice(0, limit) + "..." : text;
};

//Count Characters
export const CountCharactersWithLimit = (text, limit = null) => {
  if (limit === null) {
    return text; // If no limit is provided, return the full text.
  }
  return text.length > limit ? text.slice(0, limit) + "..." : text;
};

// Capitialize first character of the word
export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
//#endregion

//#region DateTimes

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

export const checkTimeConditions = (values, datetime) => {
  alert(values);
  // Step 1: Convert the comma-separated values into a list (array)
  const valueList = values.split(",").map(Number);

  // Step 2: Extract the hour and minute from the datetime input
  const date = new Date(datetime);
  const hour = date.getHours();
  const minute = date.getMinutes();

  // Step 3: Check if the hour is included in the list of values
  const isHourInList = valueList.includes(hour);

  // Step 4: Check if the minute is greater than or equal to the hour
  const isMinuteGreaterOrEqual = minute >= hour;

  // Trigger alert if both conditions are met
  if (isHourInList && isMinuteGreaterOrEqual) {
    alert("Conditions met: Hour is in the list and minutes are >= hour");
  }
};

export const formatDateTimeWithAmPm = (dateTime) => {
  // Create a Date object from the input
  const date = new Date(dateTime);

  // Extract month, day, and year
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
  const day = date.getDate().toString().padStart(2, "0");
  const year = date.getFullYear();

  // Extract hours and minutes
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");

  // Determine AM or PM
  const amPm = hours >= 12 ? "PM" : "AM";

  // Convert hours to 12-hour format
  hours = hours % 12 || 12; // Adjust 0 (midnight) to 12

  // Format and return the result
  return `${month}-${day}-${year} ${hours}:${minutes} ${amPm}`;
};

export const convertToISO = (datetime) => {
  // Split the date and time parts
  const [datePart, timePart, meridiem] = datetime.split(" ");
  const [day, month, year] = datePart
    .split("/")
    .map((num) => parseInt(num, 10));
  let [hours, minutes, seconds] = timePart
    .split(":")
    .map((num) => parseInt(num, 10));

  // Adjust hours for AM/PM
  if (meridiem.toLowerCase() === "pm" && hours !== 12) {
    hours += 12;
  } else if (meridiem.toLowerCase() === "am" && hours === 12) {
    hours = 0;
  }

  // Format the date and time into ISO
  const isoString = `${year}-${String(month).padStart(2, "0")}-${String(
    day
  ).padStart(2, "0")}T${String(hours).padStart(2, "0")}:${String(
    minutes
  ).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  return isoString;
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

export const getFirstAndLastDayOfMonth = () => {
  var now = new Date(); // Get the current date
  var monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  var monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0);

  const firstAndLastDates = {
    monthStart: monthStart.toISOString().slice(0, 10),
    monthEnd: monthEnd.toISOString().slice(0, 10),
    currentDay: now.toISOString().slice(0, 10),
  };

  return firstAndLastDates;
};

export const formatDateTimeForInput = (date) => {
  const isoString = new Date(date).toISOString();
  return isoString.slice(0, 16); // Extract the format yyyy-MM-ddTHH:mm
};

//#endregion
