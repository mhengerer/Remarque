const { PlannerItem, GridItem } = require("../models");

module.exports = {
  checkTodaysDate: (date) => {
    const today = new Date().toISOString.substring(0, 10);
    const input = new Date(date).toISOString.substring(0, 10);

    return today === input;
  },
  getTodaysDate: (date) => {
    return new Date().toISOString.substring(0, 10);
  },
};
