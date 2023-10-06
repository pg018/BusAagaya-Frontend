export const emailValidationRegex = new RegExp(
  /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/
);
export const numberOnlyRegex = new RegExp(/^[0-9]+$/);
export const positiveNumberOnlyRegex = new RegExp(/^[1-9]\d*$/);
export const dateFormat = "YYYY-MM-DD";
export const timeFormat = "HH:mm";
export const primaryColor = "bg-orange-500";
export const hoverPrimaryColor = "hover:bg-blue-500";
export const disabledPrimaryColor = "disabled:bg-orange-300";

export const locationList: string[] = [
  "Mumbai, India",
  "Delhi, India",
  "Bangalore, India",
  "Kolkata, India",
  "Chennai, India",
  "Hyderabad, India",
  "Pune, India",
  "Ahmedabad, India",
  "Jaipur, India",
  "Surat, India",
];

export const weekdaysList = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

// date format in UTC and YYYY-MM-DDTHH:mm:00.000Z
export const resetHoursAndMinutes = (dateString: string): string => {
  const date = new Date(dateString);
  date.setUTCHours(0, 0, 0, 0);
  return date.toISOString();
};

// takes utc string as input and inputs readable data
export const getDateObjInReadableFormat = (dateString: string): string => {
  const dateObj = new Date(dateString);
  const date = dateObj.toLocaleDateString(undefined, {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    weekday: "long",
  });
  const time = dateObj.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
  });
  return `${date}, ${time}`;
};
