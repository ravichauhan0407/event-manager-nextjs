import Link from "next/link";
import styles from "./Calendar.module.css";
import { getDateInDesiredFormat } from "@/lib/helpers";

const Day = ({ day, month, year, checkDateContainEvent }) => {
  const date = getDateInDesiredFormat({ day, month, year });

  const hasEvents = checkDateContainEvent[date];

  return (
    <Link href={`?day=${day}&month=${month}&year=${year}`} className="relative">
      <div className={day ? styles.calendar_day : ""}>{day}</div>
      {hasEvents && (
        <div className="w-3 h-3 rounded-full bg-red-600 absolute right-2 top-2" />
      )}
    </Link>
  );
};

export default Day;
