const Order = require("../models/orderModel");

const createOrder = async (req, res) => {
  try {
    var order = new Order({
      user_id: req.body.user_id,
      product_id: req.body.product_id,
    });

    const orderData = await order.save();

    res
      .status(200)
      .send({ success: true, msg: "Order details", data: orderData });
  } catch (error) {
    res.status(400).send({ success: false, msg: error.message });
  }
};

const getOrders = async (req, res) => {
  try {
    var orders;

    if (req.body.user_id !== undefined) {
      orders = await Order.find({ user_id: req.body.user_id });
    } else {
      orders = await Order.find({});
    }

    res.status(200).send({ success: true, msg: "Orders Data", data: orders });
  } catch (error) {
    res.status(400).send({ success: false, msg: error.message });
  }
};

const deleteOrder = async (req, res) => {
  try {
    await Order.deleteOne({ _id: req.body.order_id });

    res.status(200).send({ success: true, msg: "Order deleted successfully!" });
  } catch (error) {
    res.status(400).send({ success: false, msg: error.message });
  }
};

module.exports = {
  createOrder,
  getOrders,
  deleteOrder,
};
