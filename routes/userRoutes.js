const express = require("express");
const Route = express.Router();

const { auth } = require("../middlewares/Auth");

const {
  getUsers,
  getUser,
  patchUser,
  deleteUser,
  postUser,
  loginUser,
} = require("../controller/usersController");

// const { body } = require("express-validator");

const validateSanitize = require("../middlewares/validation-sanitization");

// CRUD operation
// create - read - update - delete

// get request for all users
Route.get("/", auth, getUsers);

// route to get a single user
Route.get("/:id", auth, getUser);

// get post request
Route.post("/", validateSanitize, postUser);

Route.post("/login", loginUser);

// get patch request (update)
// minor change, for example only the id or the email -> use patch method
Route.patch("/:id", auth, patchUser);

// get put request

// bigger change, for example replace the whole item -> use put method
// Route.put("/:id", (req, res) => {
//   const user = users.find((item) => item.id === Number(req.params.id));
//   res.json({ success: true, data: user });
// });

//get delete request
Route.delete("/:id", auth, deleteUser);

module.exports = Route;
