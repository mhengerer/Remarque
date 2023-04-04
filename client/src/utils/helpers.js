const { PlannerItem, GridItem } = require("../models");
const { Card, Planner, Todo } = require("../components/grid Items");

module.exports = {
  checkTodaysDate: (date) => {
    const today = new Date().toISOString.substring(0, 10);
    const input = new Date(date).toISOString.substring(0, 10);

    return today === input;
  },
  getTodaysDate: () => {
    return new Date().toISOString.substring(0, 10);
  },
};
