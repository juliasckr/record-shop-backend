const express = require("express");
const Route = express.Router();

const {
  getRecords,
  getRecord,
  postRecord,
  patchRecord,
  deleteRecord,
} = require("../controller/recordsController");

Route.get("/", getRecords);
Route.get("/:id", getRecord);
Route.post("/", postRecord);
Route.patch("/:id", patchRecord);
Route.delete("/:id", deleteRecord);

module.exports = Route;
