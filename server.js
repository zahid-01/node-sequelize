const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
require("./Models/index");

const server = require("./app");

server.listen(process.env.PORT, () => {
  console.log("💥Server Fired. PORT : ", process.env.PORT);
});
