const mongoose = require("mongoose");
const Order = require("../model/OrderSchema");
const faker = require("faker");

mongoose.connect(
  "mongodb://127.0.0.1:27017/record-shop",
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  () => {
    console.log("connected to database");
  }
);

async function seedData() {
  try {
    await Order.deleteMany({});
    const orders = Array(10)
      .fill(null)
      .map(() => {
        const order = new Order({
          quantity: faker.datatype.number(),
          record: faker.datatype.uuid(),
        });
        return order.save();
      });
    console.log(orders);
    await Promise.all(orders);
  } catch (err) {
    console.log(err.message);
  }
  mongoose.connection.close();
}

seedData();
