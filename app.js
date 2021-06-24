const express = require("express");
require("./mongooseConnection");
const port = 3000;

const userRoutes = require("./routes/userRoutes");
const recordRoutes = require("./routes/recordsRoutes");
const orderRoutes = require("./routes/ordersRoutes");

const createError = require("http-errors");

const cors = require("cors");

const { auth } = require("./middlewares/Auth");

// create server
const app = express();

// cors middleware
app.use(cors({ origin: "*", exposedHeaders: "x-auth" }));

// express middleware
app.use(express.json());

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Methods", [
//     "GET",
//     "POST",
//     "PATCH",
//     "DELETE",
//     "OPTIONS",
//   ]);
//   res.header("Access-Control-Allow-Headers", [
//     "Accept",
//     "Content-Type",
//     "x-auth",
//     "HTTP",
//   ]);
//   res.header("Access-Control-Expose-Headers", ["x-auth", "Content-Type"]);
//   next();
// });

// function printTime(req, res, next) {
//   console.log("time: ", new Date());
//   console.log("method: ", req.method);
//   console.log("url: ", req.url);
//   next();
// }

// app.use(printTime);

// endpoints/routes

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});
app.use("/users", userRoutes);
app.use("/records", auth, recordRoutes);
app.use("/orders", auth, orderRoutes);

// 404 page not found middleware
app.use((req, res, next) => {
  let err = createError(404, "page not found");
  next(err);
});

// universal error handling middleware

app.use((err, req, res, next) => {
  res.status(err.status || 500).send({ success: false, message: err.message });
});

app.listen(port, () =>
  console.log("express server is running on port: ", port)
);
