import dayjs from "dayjs";

// Source: https://www.youtube.com/watch?v=s9-K02CP8hw
export const getDates = (month = dayjs().month(), year = dayjs().year()) => {
  const firstDayOfMonth = dayjs().year(year).month(month).startOf("month");
  const lastDayOfMonth = dayjs().year(year).month(month).endOf("month");

  const calendarArray = [];
  // Constitutes a 6 week calendar with room on either side for spillover
  const daysOnCalendar = 42;

  // First week of calendar, AKA "prefix dates"
  for (let i = 0; i < firstDayOfMonth.day(); i++) {
    const date = firstDayOfMonth.day(i);

    calendarArray.push({
      currentMonth: false,
      date,
    });
  }

  // Actual calendar month depicted
  for (let i = firstDayOfMonth.date(); i <= lastDayOfMonth.date(); i++) {
    calendarArray.push({
      currentMonth: true,
      date: firstDayOfMonth.date(i),
      today:
        firstDayOfMonth.date(i).toDate().toDateString() ===
        dayjs().toDate().toDateString(),
    });
  }

  const daysRemaining = daysOnCalendar - calendarArray.length;
  // Last week of calendar, AKA "suffix dates"
  for (
    let i = lastDayOfMonth.date() + 1;
    i <= lastDayOfMonth.date() + daysRemaining;
    i++
  ) {
    calendarArray.push({ currentMonth: false, date: lastDayOfMonth.date(i) });
  }

  return calendarArray;
};
