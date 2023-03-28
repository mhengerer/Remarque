module.exports = {
  getPreviousMonday: (dateString) => {
    const dayObj = new Date(dateString);
    const weekday = dayObj.getDay();
    const diff = dateString === 0 ? 6 : weekday - 1;
    const prevMonday = new Date(diff);
    prevMonday.setDate(dayObj.getDate() - diff);
    return prevMonday;
  },
  getNextSunday: (dateString) => {
    const dayObj = new Date(dateString);
    const dayOfWeek = dayObj.getDay();
    const daysUntilNextSunday = 7 - dayOfWeek;
    const nextSunday = new Date(
      dayObj.getTime() + daysUntilNextSunday * 24 * 60 * 60 * 1000
    );
    return nextSunday;
  },
};
