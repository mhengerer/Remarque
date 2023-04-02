const { PlannerItem, GridItem } = require("../models");

module.exports = {
  getPreviousMonday: (dateString) => {
    const day = new Date(dateString);
    const dayOfWeek = day.getDay();
    const daysSinceMonday = (dayOfWeek + 6) % 7;
    const mondayDate = new Date(
      day.getFullYear(),
      day.getMonth(),
      day.getDate() - daysSinceMonday
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
  createPlanner: async (week) => {
    let plannerItems = [];

    for (day in week) {
      const plannerItem = await PlannerItem.create({ dayOfCurrentMonth: day });
      plannerItems.push(plannerItem);
    }

    return plannerItems;
  },
  createGridTemplate: async () => {
    const layout = [
      {
        i: "0",
        x: 0,
        y: 0,
        w: 2,
        h: 6,
        minW: 2,
        minH: 6,
        maxH: 6,
        card: "planner",
      },
      { i: "1", x: 3, y: 0, w: 1, h: 3, minH: 3, maxH: 3, card: "card" },
      { i: "2", x: 4, y: 0, w: 1, h: 3, minH: 3, maxH: 3, card: "card" },
      { i: "4", x: 2, y: 0, w: 3, h: 3, card: "todo" },
      { i: "5", x: 2, y: 0, w: 1, h: 3, minH: 3, maxH: 3, card: "card" },
    ];

    let gridItems = [];

    for (let i = 0; i < layout.length; i++) {
      const card = layout[i];
      const gridObj = await GridItem.create({
        title: "Note",
        body: "",
        i: card.i,
        x: card.x,
        y: card.y,
        w: card.w,
        h: card.h,
        minH: card.minH,
        maxH: card.mahX,
        card: card.card,
      });
      gridItems.push(gridObj);
    }

    return gridItems;
  },
};
