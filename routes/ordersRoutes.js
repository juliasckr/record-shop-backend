const express = require("express");
const Route = express.Router();

const {
  getOrder,
  getOrders,
  postOrder,
  patchOrder,
  deleteOrder,
} = require("../controller/ordersController");

Route.get("/", getOrders);

Route.get("/:id", getOrder);

Route.post("/", postOrder);

Route.patch("/:id", patchOrder);

Route.delete("/:id", deleteOrder);

module.exports = Route;
