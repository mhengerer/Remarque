const { AuthenticationError } = require("apollo-server-express");
const { User, Spread, GridItem, PlannerItem } = require("../models");
const { signToken } = require("../utils/auth");
const {
  getPreviousMonday,
  getNextSunday,
  sevenDay,
  createPlanner,
  createGridTemplate,
} = require("../utils/weekCalc");

const resolvers = {
  Query: {
    // QCed
    user: async (parent, args, context) => {
      const user = await User.findById(context.user._id)
        .populate([
          {
            path: "spreads",
            populate: "gridItems ",
          },
          {
            path: "spreads",
            populate: "plannerItems ",
          },
          {
            path: "spreads",
            populate: "layout",
          },
        ])
        .sort({ monday: -1 });
      return user;

      //throw new AuthenticationError("Not logged in");
    },
    // QCed
    allUsers: async (parent, args, context) => {
      const users = await User.find({});

      return users;
    },
    spread: async (parent, { date }, context) => {
      if (context.user) {
        const day = new Date(date);
        const monday = getPreviousMonday(day).toISOString().substring(0, 10);
        const spread = await Spread.findOne()
          .where("monday")
          .equals(monday)
          .where("userId")
          .equals(context.user._id);

        return spread;
      }
    },
    spreadById: async (parent, { _id }, context) => {
      if (context.user) {
        return await Spread.findById(_id).populate([
          {
            path: "gridItems",
            populate: "_id",
          },
          {
            path: "plannerItems",
            populate: "_id",
          },
          {
            path: "layout",
            populate: "_id",
          },
        ]);
      }
    },
    userSpreads: async (parent, args, context) => {
      if (context.user) {
        return await Spread.find().where("userId").equals(context.user._id);
      }
    },
  },
  Mutation: {
    // Create new user
    // QCed
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    // Add new spread as a subdocument to user model
    // Takes in 3 parameters:
    // -Referenced date for making the new spread
    // -Planner items that the user has saved
    // -Location of the grid items on the page
    addSpread: async (parent, { date }, context) => {
      if (context.user) {
        let monday = getPreviousMonday(date);
        let sunday = getNextSunday(date);
        const week = sevenDay(monday);
        const plannerItems = await createPlanner(week);
        const { gridItems, layoutItems } = await createGridTemplate();
        let layout = layoutItems;
        const userId = context.user._id;

        monday = monday.toISOString().substring(0, 10);
        sunday = sunday.toISOString().substring(0, 10);
        const spread = await Spread.create({
          monday,
          sunday,
          plannerItems,
          gridItems,
          layout,
          userId,
        });

        await User.findByIdAndUpdate(context.user._id, {
          $push: { spreads: spread },
        });

        return spread;
      }

      throw new AuthenticationError("Not logged in");
    },

    addPlannerItem: async (parent, { spreadId, body }, context) => {
      if (context.user) {
        // Set items in exact order of model
        const plannerItem = await PlannerItem.create({ body });

        await Spread.findByIdAndUpdate(spreadId, {
          $push: { plannerItems: plannerItem },
        });

        return plannerItem;
      }
    },
    // QCed

    addGridItem: async (
      parent,
      { title, body, x, y, h, w, i, spreadId },
      context
    ) => {
      if (context.user) {
        // Set items in exact order of model
        const gridItem = await GridItem.create({ title, body, x, y, h, w, i });

        await Spread.findByIdAndUpdate(spreadId, {
          $push: { gridItems: gridItem },
        });

        return gridItem;
      }

      throw new AuthenticationError("Not logged in");
    },
    updateGridItem: async (parent, args, context) => {
      if (context.user) {
        return await GridItem.findByIdAndUpdate(args._id, args, {
          new: true,
        });
      }

      throw new AuthenticationError("Not logged in");
    },
    updatePlannerItem: async (parent, args, context) => {
      if (context.user) {
        return await PlannerItem.findByIdAndUpdate(args._id, args, {
          new: true,
        });
      }

      throw new AuthenticationError("Not logged in");
    },
    updateUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, {
          new: true,
        });
      }

      throw new AuthenticationError("Not logged in");
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);

      return { token, user };
    },
  },
};

module.exports = resolvers;
