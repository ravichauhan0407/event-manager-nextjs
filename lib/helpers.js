
export function getDateInDesiredFormat({ day, month, year } = {}) {
  if (day === undefined || month === undefined || year === undefined) {
    throw new Error("Invalid data!");
  }

  return (
    String(day).padStart(2, 0) +
    "-" +
    String(month + 1).padStart(2, 0) +
    "-" +
    String(year)
  );
}

