const { AuthenticationError } = require("apollo-server-express");
const { User, Spread, GridItem, PlannerItem } = require("../models");
const { signToken } = require("../utils/auth");
const { getPreviousMonday, getNextSunday } = require("../utils/weekCalc");

const resolvers = {
  Query: {
    // QCed
    user: async (parent, args, context) => {
      const user = await User.findById(context.user._id);

      return user;

      //throw new AuthenticationError("Not logged in");
    },
    // QCed
    allUsers: async (parent, args, context) => {
      const users = await User.find({});

      return users;
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
    addSpread: async (parent, { date, plannerItems, gridItems }, context) => {
      if (context.user) {
        const monday = getPreviousMonday(date);
        const sunday = getNextSunday(date);
        const spread = await Spread.create({
          monday,
          sunday,
          plannerItems,
          gridItems,
        });

        await User.findByIdAndUpdate(context.user._id, {
          $push: { spreads: spread },
        });

        return spread;
      }

      throw new AuthenticationError("Not logged in");
    },

    addPlannerItem: async (parent, {spreadId, body}, context) => {
      if (context.user) {
        // Set items in exact order of model
        const plannerItem = await PlannerItem.create({ body });

        await Spread.findByIdAndUpdate(spreadId, {
          $push: { plannerItems: plannerItem },
        });

        return plannerItem
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
    // TODO: Unbreak this
    updateGridItem: async (parent, args, context) => {
      if (context.user) {
        return await GridItem.findByIdAndUpdate(context.grid_item._id, args, {
          new: true,
        });
      }

      throw new AuthenticationError("Not logged in");
    },
    // Update user profile
    // TODO: Take a second look at this method
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
    // addGridItem: async (parent, { title, body, i, x, y, w, h }, context) => {
    //   const GridItem = await GridItem.create(args);

    //   return GridItem;
    // },
  },
};

    // TODO: Write this
  //   updateSpread: async (parent, {plannerItems, _id}, context) => {
  //     if (context.user) {
  //       return await Spread.findByIdAndUpdate(_id, {planner : {}}, {
  //         new: true,
  //       });
  //   }
  // },

module.exports = resolvers;
