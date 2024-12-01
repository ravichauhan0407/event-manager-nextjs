import styles from "./Calendar.module.css";
import Day from "./Day";
import { getDaysInMonth, monthNames } from "@/lib/constant";
import EventModal from "./EventContainer";
import ModalContainer from "./ModalContainer";
import Link from "next/link";
import { getAllEventsOfByDateRange } from "@/app/api/data";
import { getDateInDesiredFormat } from "@/lib/helpers";
import { getPlatform } from "@/lib/getPlatform";
import { headers } from "next/headers";

const getYearDelta = (month) => {
  if (month < 0) return -1;
  if (month > 11) return 1;
  return 0;
};

const Calendar = async ({ day, month: queryMonth, year: queryYear }) => {
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const month = Number(queryMonth || currentMonth);
  const year = Number(queryYear || currentYear);
  const days = getDaysInMonth(month + 1, year);

  const getLinks = (month) => {
    const newYear = year + getYearDelta(month);
    return `?month=${(month + 12) % 12}&year=${newYear}`;
  };

  const daysDetails = { day, month, year };

  const dateStart = getDateInDesiredFormat({ day: 1, month, year });
  const dateEnd = getDateInDesiredFormat({ day: 31, month, year });

  const res = await getAllEventsOfByDateRange({
    dateStart,
    dateEnd,
  });

  const checkDateContainEvent = res.data?.reduce(
    (prev, item) => ({ ...prev, [item.date]: true }),
    {}
  );

  const headersList = await headers();
  const userAgent = headersList.get("user-agent") || "Unknown User Agent";
  const platform = getPlatform(userAgent);
  console.log(platform);
  return (
    <div className={styles.calendar}>
      {/* Calendar Header with month navigation */}
      <div className={styles.calendar_header}>
        <Link
          href={getLinks(month - 1)}
          className="flex justify-center items-center w-10 h-10 rounded-full bg-white text-secondary"
        >
          &lt;
        </Link>
        <span className={styles.calendar_month}>
          {monthNames[month]} {year}
        </span>
        <Link
          href={getLinks(month + 1)}
          className="flex justify-center items-center w-10 h-10 rounded-full bg-white text-secondary"
        >
          &gt;
        </Link>
      </div>

      {/* Days of the week */}
      <div className={styles.calendar_weekdays}>
        <div className="text-red">Sun</div>
        <div>Mon</div>
        <div>Tue</div>
        <div>Wed</div>
        <div>Thu</div>
        <div>Fri</div>
        <div>Sat</div>
      </div>

      {/* Days of the month */}
      <div className={styles.calendar_days}>
        {days.map((day, index) => (
          <Day
            key={index}
            {...daysDetails}
            day={day}
            checkDateContainEvent={checkDateContainEvent}
          />
        ))}
      </div>
      <ModalContainer
        title="Add Event"
        open={day !== undefined}
        onClose={() => setOpenAddEventModal(false)}
      >
        <EventModal {...daysDetails} />
      </ModalContainer>
    </div>
  );
};

export default Calendar;
