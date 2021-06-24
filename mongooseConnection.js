const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.URI, {
  dbName: process.env.DB,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("open", () => console.log("db connected"));
mongoose.connection.on("error", (err) => console.log(err.message));
mongoose.connection.on("disconnected", () => console.log("db disconnected"));

// when control c is pressed:
process.on("SIGINT", () => {
  mongoose.connection.close();
  process.exit();
});
