const checkTodaysDate = (date) => {
  const today = new Date().toISOString.substring(0, 10);
  const input = new Date(date).toISOString.substring(0, 10);

  return today === input;
};

const getTodaysDate = () => {
  return new Date().toISOString.substring(0, 10);
};

const getPreviousMonday = (dateString) => {
  const day = new Date(dateString);
  const dayOfWeek = day.getDay();
  const daysSinceMonday = (dayOfWeek + 6) % 7;
  const mondayDate = new Date(
    day.getFullYear(),
    day.getMonth(),
    day.getDate() - daysSinceMonday
  );
  return mondayDate;
};

module.exports = {
  checkTodaysDate,
  getTodaysDate,
  getPreviousMonday,
};
