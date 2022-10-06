const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connection
  .once("open", () => console.log("MongoDB connection ready!"))
  .on("error", (error) => console.log(error));

async function dbConnect() {
  await mongoose.connect(process.env.MONGO_DB);
}

async function dbDisconnect() {
  await mongoose.disconnect();
}

module.exports = {
  dbConnect,
  dbDisconnect,
};
