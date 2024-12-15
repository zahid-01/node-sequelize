const sequelize = require("./Models");
const Profile = require("./Models/profile");
const User = require("./Models/Users");

(async () => {
  try {
    await Profile.sync({ force: false });
    console.log("User table created successfully.");
  } catch (error) {
    console.error("Error syncing database:", error);
  } finally {
    await sequelize.close();
  }
})();
