const { User } = require('../models');

const resolvers = {
  Query: {
    me: async (context) => {
      if(context.user) {
          const userData = await User.findOne({ _id: context.user._id })
              .select('-__v -password')
      return userData;
      }

      throw new AuthenticationError('Not logged in');
    }
  },

  Mutation: {
    addUser: async (args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },

    login: async ({ email, password }) => {
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

    addBook: async ({ input }, context) => {
      if(context.user) {
        return user.findOneAndUpdate(
          { _id: context.user._id },
          {
            $addToSet: { savedBooks: input }
          },
          { new: true }
        );
      }
      throw new AuthenticationError('You need to be logged in!')
    },

    removeBook: async (args, context) => {
      if (context.user) {
        return User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks: { bookId: args.bookId } } },
          { new: true }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    }
  }
};

module.exports = resolvers;
