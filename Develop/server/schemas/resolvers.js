const { User } = require('../models');

const resolvers = {
  Query: {
    users: async () => {
      return User.find();
    },

    user: async (parent, { userId }) => {
      return User.findOne({ _id: userId });
    },
  },

  Mutation: {
    addUser: async (parent, { name, email, password }) => {
      const user = await User.create({ name, email, password });
      const token = signToken(user);

      return { token, user };
    },
    addBook: async (parent, { userId, book }) => {
      return user.findOneAndUpdate(
        { _id: userId },
        {
          $addToSet: { books: book },
        },
        {
          new: true,
          runValidators: true,
        }
      );
    },
    removeUser: async (parent, { userId }) => {
      return User.findOneAndDelete({ _id: userId });
    },
    removebook: async (parent, { userId, book }) => {
      return User.findOneAndUpdate(
        { _id: userId },
        { $pull: { books: book } },
        { new: true }
      );
    },
  },
};

module.exports = resolvers;
