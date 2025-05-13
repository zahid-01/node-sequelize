const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: false,
  }
);

const db = {};
const associations = require("./Associations/index");

db.user = require("./UserModel")(sequelize, DataTypes);
associations(db);

(async () => {
  try {
    await sequelize.authenticate();
    // await sequelize.sync({ force: true });
    // await db.products.sync({ force: true });
    console.log("DB Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

module.exports = db;
