module.exports = {
  // TODO: This broke
  getPreviousMonday: (dateString) => {
    const dayOfWeek = dateString.getDay();
    const daysSinceMonday = (dayOfWeek + 6) % 7;
    const mondayDate = new Date(
      dateString.getFullYear(),
      dateString.getMonth(),
      dateString.getDate() - daysSinceMonday
    );
    return mondayDate;
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
  sevenDay: (mon) => {
    const daysOfWeek = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(mon);
      date.setDate(mon.getDate() + i);
      const dayOfMonth = date.getDate();
      daysOfWeek.push(dayOfMonth);
    }
    return daysOfWeek;
  },
};
