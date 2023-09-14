const { AuthenticationError } = require("apollo-server-express");
const { User } = require("../models"); // Import the User model from your application
const { signToken } = require("../utils/auth"); // Import a function for signing JWT tokens

const resolvers = {
  Query: {
    me: async (_parent, args, context) => {
      // Check if a user is authenticated (context.user will be available if authenticated)
      if (context.user) {
        // Fetch user data by their ID and exclude sensitive information
        const userData = await User.findOne({ _id: context.user._id }).select(
          "-__v -password"
        );

        return userData;
      }

      // If not authenticated, throw an AuthenticationError
      throw new AuthenticationError("You are not logged in!");
    },
  },

  Mutation: {
    addUser: async (_parent, args) => {
      // Create a new user using the User model and provided arguments
      const user = await User.create(args);
      
      // Generate a JWT token for the new user
      const token = signToken(user);

      // Return the generated token and user data
      return { token, user };
    },

    login: async (parent, { email, password }) => {
      // Find a user by their email address
      const user = await User.findOne({ email });

      // If no user is found, throw an AuthenticationError
      if (!user) {
        throw new AuthenticationError("Wrong Username/Password");
      }

      // Check if the provided password is correct using the User model method
      const correctPw = await user.isCorrectPassword(password);

      // If the password is incorrect, throw an AuthenticationError
      if (!correctPw) {
        throw new AuthenticationError("Wrong Username/Password");
      }

      // Generate a JWT token for the authenticated user
      const token = signToken(user);

      // Return the generated token and user data
      return { token, user };
    },

    saveBook: async (parent, { bookData }, context) => {
      // Check if a user is authenticated
      if (context.user) {
        // Update the user's document by pushing the new bookData into the savedBooks array
        const updatedUser = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { savedBooks: bookData } },
          { new: true }
        );

        return updatedUser;
      }

      // If not authenticated, throw an AuthenticationError
      throw new AuthenticationError("Please Login!");
    },

    removeBook: async (parent, { bookId }, context) => {
      // Check if a user is authenticated
      if (context.user) {
        // Update the user's document by pulling the book with the specified bookId from savedBooks
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks: { bookId } } },
          { new: true }
        );

        return updatedUser;
      }

      // If not authenticated, throw an AuthenticationError
      throw new AuthenticationError("You need to be logged in!");
    },
  },
};

module.exports = resolvers;
