const dayjs = require("dayjs");
const {
  Collection,
  GridItem,
  Layout,
  PlannerItem,
  User,
} = require("../models");

module.exports = {
  sevenDay: (monday) => {
    const daysOfWeek = [];
    for (let i = 0; i < 7; i++) {
      const weekday = monday.date(i);
      daysOfWeek.push(dayjs(weekday));
    }
    return daysOfWeek;
  },
  createPlanner: async (week, userId) => {
    let weeklyCollections = [];
    for (let i = 0; i < 7; i++) {
      const weekday = i;
      const collection = await Collection.create({
        userId: userId,
        title: weekday,
      });
      weeklyCollections.push(collection);
    }

    return weeklyCollections;
  },
  createGridTemplate: async () => {
    const template = [
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
      { i: "3", x: 2, y: 0, w: 3, h: 3, minH: 3, maxH: 3, card: "todo" },
      { i: "4", x: 2, y: 0, w: 1, h: 3, minH: 3, maxH: 3, card: "card" },
    ];

    let gridItems = [];
    let layoutItems = [];

    for (const element of template) {
      const layout = element;
      const gridObj = await GridItem.create({
        title: "Note",
        body: "",
        i: layout.i,
      });
      gridItems.push(gridObj);

      const layoutObj = await Layout.create({
        i: layout.i,
        x: layout.x,
        y: layout.y,
        w: layout.w,
        h: layout.h,
        minW: layout.minW,
        maxW: layout.maxW,
        minH: layout.minH,
        maxH: layout.maxH,
        card: layout.card,
      });

      layoutItems.push(layoutObj);
    }

    return { gridItems, layoutItems };
  },
  createTutorialEntries: async (spreadId, userId) => {
    // Create Collections
    let choresCollection = await Collection.create({
      title: "Chores",
      userId,
    });
    let choresId = choresCollection._id;

    let selfCareCollection = await Collection.create({
      title: "Self Care",
      userId,
    });
    let selfCareId = selfCareCollection._id;

    // Create Planner Items
    const yoga = await PlannerItem.create({
      title: "Yoga",
      body: "Stretching helps set you up for a great day!",
      scheduled: 48600, // 8:30am start of UNIX time
      status: "O",
      collections: [choresCollection._id],
    });

    const skincare = await PlannerItem.create({
      title: "Skincare",
      body: "Everybody needs it!",
      scheduled: 51300, // 9:15am start of UNIX time
      status: "O",
      collections: [choresCollection._id, selfCareCollection._id],
    });

    // Update Collections with Planner Items
    await Collection.findByIdAndUpdate(choresCollection._id, {
      $push: { plannerItems: { $each: [yoga._id, skincare._id] } },
    });

    await Collection.findByIdAndUpdate(selfCareCollection._id, {
      $push: { plannerItems: skincare._id },
    });

    return { choresId, selfCareId };
  },
};
