const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
  const Admin = sequelize.define(
    "admins",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Name cannot be empty",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: {
          name: "unique_email",
          msg: "Email already exists",
        },
        validate: {
          isEmail: {
            msg: "Please provide a valid email address.",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false, // Password is mandatory
        validate: {
          len: {
            args: [8, 100], // Minimum 8 characters
            msg: "Password must be at least 8 characters long.",
          },
        },
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      profilePicture: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      hooks: {
        beforeCreate: async (user) => {
          if (user.password) {
            user.password = await bcrypt.hash(user.password, 10);
          }
        },
        beforeUpdate: async (user) => {
          if (user.changed("password")) {
            user.password = await bcrypt.hash(user.password, 10);
          }
        },
      },
    }
  );

  Admin.prototype.checkPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
  };

  return Admin;
};
