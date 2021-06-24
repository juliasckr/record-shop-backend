const ordersModel = require("../model/OrderSchema");
const createError = require("http-errors");

exports.getOrders = async (req, res, next) => {
  try {
    // it's asynchronous, so need to use await here to get the users
    let orders = await ordersModel
      .find({})
      .populate("records")
      .populate("user");
    res.json({ success: true, data: orders }); // or you can also use res.send()}
  } catch (err) {
    next(err);
  }
};

exports.getOrder = async (req, res, next) => {
  try {
    const { id } = req.params;
    const order = await ordersModel
      .findById(id)
      .populate("records")
      .populate("user");
    if (order) {
      return res.json({ success: true, data: order });
    } else {
      next(new createError.BadRequest("no order found in our database"));
    }
  } catch (err) {
    next(err);
  }
};

exports.postOrder = async (req, res, next) => {
  try {
    const order = new ordersModel(req.body);
    await order.save();
    res.send({ success: true, data: order });
  } catch (err) {
    console.log(err.message);
    next(err);
  }
};

exports.patchOrder = async (req, res, next) => {
  try {
    const { id } = req.params;
    // update order in our collection
    const order = await ordersModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.send({ success: true, data: order });
  } catch (err) {
    next(err);
  }
};

exports.deleteOrder = async (req, res, next) => {
  try {
    const { id } = req.params;
    const order = await ordersModel.findByIdAndDelete(id);
    res.send({ success: true, data: order });
  } catch (err) {
    next(err);
  }
};
