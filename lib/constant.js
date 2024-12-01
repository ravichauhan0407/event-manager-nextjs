export const monthNames = [
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

export const getDaysInMonth = (month, year) => {
  const daysInMonth = new Date(year, month, 0).getDate(); // Get number of days in a month
  const startDay = new Date(year, month - 1, 1).getDay(); // Get the first day of the month
  const days = [];
  for (let i = 0; i < startDay; i++) {
    days.push(null); // Empty spots for the previous month
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  return days;
};
