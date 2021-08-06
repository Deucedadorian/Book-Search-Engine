const { User } = require('../models');
const { signToken } = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express');

const resolvers = {
  Query: {
    me: async ( context) => {
      if(context.user) {
          const userData = await User.findOne({ _id: context.user._id })
              .select('-__v -password')
      return userData;
      }

      throw new AuthenticationError('Not logged in');
    }
  },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
          throw new AuthenticationError('Incorrect Credentials'); 
      }

      const correctPassword = await user.isCorrectPassword(password);

      if (!correctPassword) {
          throw new AuthenticationError('Incorrect Credentials');
      }

      const token = signToken(user);
      return { token, user };
    },

    addBook: async (parent, { input }, context) => {
      if(context.user) {
        const updatedUser = await user.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedBooks: input } },
          { new: true }
        );
        return updatedUser
      }
      throw new AuthenticationError('You need to be logged in!')
    },

    removeBook: async (parent, args, context) => {
      if (context.user) {
         const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks: { bookId: args.bookId } } },
          { new: true }
        );
        return updatedUser;
      }
      throw new AuthenticationError('You need to be logged in!');
    }
  }
};

module.exports = resolvers;
