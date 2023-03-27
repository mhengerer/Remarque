const { AuthenticationError } = require("apollo-server-express");
const { User, Spread, GridItem } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    user: async (parent, args, context) => {
      const user = await User.findById(context.user._id);

      return user;

      //throw new AuthenticationError("Not logged in");
    },
    allUsers: async (parent, args, context) => {
      const users = await User.find({});

      return users;
    },
  },
  Mutation: {
    // Create new user
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    // Add new spread as a subdocument to user model
    addSpread: async (parent, { dates, plannerItems, gridItems }, context) => {
      if (context.user) {
        const spread = new Spread({ dates, plannerItems, gridItems });

        await User.findByIdAndUpdate(context.user._id, {
          $push: { spreads: spread },
        });

        return spread;
      }

      throw new AuthenticationError("Not logged in");
    },
    updatePlannerItem: async (parent, args, context) => {},
    addPlannerItem: async (parent, args, context) => {},
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

module.exports = resolvers;
