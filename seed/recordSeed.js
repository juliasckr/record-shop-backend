const mongoose = require("mongoose");
const Record = require("../model/RecordSchema");
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
    await Record.deleteMany({});
    const records = Array(10)
      .fill(null)
      .map(() => {
        const record = new Record({
          title: faker.lorem.sentence(),
          artist: faker.animal.type(),
          year: faker.date.past(),
          img: faker.random.image(),
          price: faker.commerce.price(),
        });
        return record.save();
      });
    console.log(records);
    await Promise.all(records);
  } catch (err) {
    console.log(err.message);
  }
  mongoose.connection.close();
}

seedData();
