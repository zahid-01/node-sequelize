module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "Users",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      role: {
        type: DataTypes.ENUM("user", "consultant", "admin"),
        allowNull: false,
        defaultValue: "user",
      },
      // email: {
      //   type: DataTypes.STRING,
      //   allowNull: true,
      //   unique: {
      //     name: "unique_email",
      //     msg: "Email already exists",
      //   },
      //   validate: {
      //     isEmail: {
      //       msg: "Please provide a valid email address.",
      //     },
      //   },
      // },
      // password: {
      //   type: DataTypes.STRING,
      //   allowNull: true, // Password is mandatory
      //   validate: {
      //     len: {
      //       args: [8, 100], // Minimum 8 characters
      //       msg: "Password must be at least 8 characters long.",
      //     },
      //   },
      // },
      otp: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    }
    // {
    //   hooks: {
    //     beforeCreate: async (user) => {
    //       if (user.password) {
    //         user.password = await bcrypt.hash(user.password, 10);
    //       }
    //     },
    //     beforeUpdate: async (user) => {
    //       if (user.changed("password")) {
    //         user.password = await bcrypt.hash(user.password, 10);
    //       }
    //     },
    //   },
    // }
  );

  // User.prototype.checkPassword = async function (password) {
  //   return await bcrypt.compare(password, this.password);
  // };

  return User;
};
