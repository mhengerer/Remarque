const { AuthenticationError } = require("apollo-server-express");
const { User, Spread, Notecard } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id);

        return user;
      }

      throw new AuthenticationError('Not logged in');
    },
  },
  Mutations: {
    // Create new user 
    addUser: async (parent, args) => {
      const user = await User.create(args); 
      const token = signToken(user); 

      return { token, user }; 
    },
    // Add new spread as a subdocument to user model
    addSpread: async (parent, { dates, plannerItems, gridItems }, context) => {
      console.log(context);
      if (context.user) {
        const spread = new Spread({ dates, plannerItems, gridItems });

        await User.findByIdAndUpdate(context.user._id, { $push: { spreads: spread } });

        return spread;
      }

      throw new AuthenticationError('Not logged in');
    },
    addNotecard: async (parent, { Notecard }, context) => {
      const notecard = await Notecard.create(args); 

      return notecard; 
    }, 
    addPlannerItem: async (parent, args, context) => {

    },
    // Update user profile 
    updateUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, { new: true });
      }

      throw new AuthenticationError('Not logged in');
    },
    // TODO: Unbreak this 
    updateNotecard: async (parent, args, context) => {
      if (context.user) {
        return await Spread.findByIdAndUpdate(
          { 
            _id: mongoose.Types.ObjectId(req.params.spread_id), 
            "gridItems": mongoose.Types.ObjectId(req.params.grid_id) 
          }, 
          { $set: { "gridItems.$.paid": true } },
          { returnOriginal: false }
        );
      }

      throw new AuthenticationError('Not logged in');
    }, 
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    }
  }
};

module.exports = resolvers;
