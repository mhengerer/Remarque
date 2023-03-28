module.exports = {
  getPreviousMonday: (date) => {
    const day = date.getDay();
    const diff = day === 0 ? 6 : day - 1;
    const prevMonday = new Date(date);
    prevMonday.setDate(date.getDate() - diff);
    return prevMonday;
  },
  getNextSunday: (date) => {
    const dayOfWeek = date.getDay();
    const daysUntilNextSunday = 7 - dayOfWeek;
    const nextSunday = new Date(
      date.getTime() + daysUntilNextSunday * 24 * 60 * 60 * 1000
    );
    return nextSunday;
  },
};
