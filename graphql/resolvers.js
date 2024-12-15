const User = require("../Models/index").user;

const resolvers = {
  Query: {
    // Resolver to fetch all users
    getUsers: async () => {
      try {
        return await User.findAll();
      } catch (error) {
        throw new Error("Error fetching users");
      }
    },

    // Resolver to fetch a single user by ID
    getUser: async (_, { id }) => {
      try {
        const user = await User.findByPk(id);
        if (!user) {
          throw new Error("User not found");
        }
        return user;
      } catch (error) {
        throw new Error("Error fetching user");
      }
    },
  },

  Mutation: {
    // Resolver to create a new user
    createUser: async (_, { phone, role, otp, isActive }) => {
      try {
        const newUser = await User.create({
          phone,
          role: role || "user", // Default role to "user" if not provided
          otp,
          isActive: isActive !== undefined ? isActive : true, // Default to true if not provided
        });
        return newUser;
      } catch (error) {
        throw new Error("Error creating user");
      }
    },
  },
};

module.exports = resolvers;
