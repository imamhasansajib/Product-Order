const express = require("express");
const order_route = express();

const bodyParser = require("body-parser");
order_route.use(bodyParser.json());
order_route.use(bodyParser.urlencoded({ extended: true }));

const orderController = require("../controllers/orderController");

order_route.post("/create-order", orderController.createOrder);

order_route.post("/get-orders", orderController.getOrders);

order_route.post("/delete-order", orderController.deleteOrder);

module.exports = order_route;
