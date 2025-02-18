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
  if (!string) return "";
  return string.charAt(0).toUpperCase() + string.slice(1);
};

//Reading Letters Time
export const calculateReadingTime = (content) => {
  // Remove HTML tags and split the content into an array of words
  const textContent = content.replace(/<[^>]*>/g, ""); // Remove HTML tags
  const words = textContent.split(/\s+/).filter(Boolean); // Split by spaces and filter out empty values

  // Average reading speed in words per minute
  const wordsPerMinute = 200;

  // Calculate the reading time in minutes
  const readingTimeInMinutes = Math.ceil(words.length / wordsPerMinute);

  return readingTimeInMinutes;
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

export const truncateDate = (date) => {
  const isoString = new Date(date).toISOString();
  return isoString.slice(0, 10); // Extract the format yyyy-MM-dd
};

export const truncateTime = (dateTime) => {
  const isoString = new Date(dateTime).toISOString();
  return isoString.slice(11, 16); // Extract the format HH:mm
};

export const setDateRestrictions = (mode, referenceDate) => {
  if (!["min", "max"].includes(mode)) {
    throw new Error(
      "Invalid mode. Use 'min' to disable past dates or 'max' to disable future dates."
    );
  }
  if (!(referenceDate instanceof Date) || isNaN(referenceDate)) {
    throw new Error("Invalid referenceDate. Provide a valid Date object.");
  }

  // Format date as YYYY-MM-DD for use with input type="date"
  const formattedDate = referenceDate.toISOString().split("T")[0];

  // Get all date input fields
  const dateInputs = document.querySelectorAll('input[type="date"]');

  // Apply the restriction
  dateInputs.forEach((input) => {
    input.setAttribute(mode, formattedDate);
  });

  return formattedDate; // Return for verification/debugging if needed
};

export const setDateTimeRestrictions = (mode, referenceDate) => {
  if (!["min", "max"].includes(mode)) {
    throw new Error(
      "Invalid mode. Use 'min' to disable past dates or 'max' to disable future dates."
    );
  }
  if (!(referenceDate instanceof Date || typeof referenceDate === "string")) {
    throw new Error(
      "Invalid referenceDate. Provide a valid Date object or date string."
    );
  }

  // Ensure referenceDate is a Date object
  const dateObject =
    typeof referenceDate === "string" ? new Date(referenceDate) : referenceDate;

  // Format date as YYYY-MM-DDTHH:mm for datetime-local
  const formattedDate = dateObject.toISOString().slice(0, 16);

  return formattedDate; // Return the formatted value
};

//eturn the matched date or null if no match is found
export const extractDate = (inputString) => {
  // Use a regular expression to find the date in the format YYYY-MM-DD
  const dateRegex = /\b\d{4}-\d{2}-\d{2} \d{1,2}:\d{2} ?(?:[APap][Mm])?\b/;
  const match = inputString.match(dateRegex);

  // Return the matched date or null if no match is found
  return match ? match[0] : null;
};
//#endregion

export const toFixedTruncate = (value, decimals) => {
  const factor = Math.pow(10, decimals);
  return Math.floor(value * factor) / factor;
};

export const scrollToBottom = (id) => {
  var area = document.querySelector(`#${id}`);
  area.scrollTop = area.scrollHeight;
};

export const checkIfStringIsValid = (value) => {
  const invalidValues = [
    null,
    undefined,
    "",
    " ",
    "null",
    "NULL",
    "undefined",
    "Undefined",
    "UNDEFINED",
  ];
  return !invalidValues.includes(value);
};

export const parseStringToFloat = (value) => {
  const invalidValues = [
    null,
    undefined,
    "",
    " ",
    "null",
    "NULL",
    "undefined",
    "Undefined",
    "UNDEFINED",
  ];
  if (invalidValues.includes(value)) {
    return 0;
  } else {
    return parseFloat(value);
  }
};
