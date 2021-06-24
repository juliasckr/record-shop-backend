const mongoose = require("mongoose");
const User = require("../model/UserSchema");
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
    // purge/delete all users inside user collection
    await User.deleteMany({});
    const users = Array(10)
      .fill(null)
      .map(() => {
        const user = new User({
          firstname: faker.name.firstName(),
          lastname: faker.name.lastName(),
          email: faker.internet.email(),
        });
        return user.save();
      });

    console.log(users);
    await Promise.all(users);
  } catch (err) {
    console.log(err.message);
  }
  mongoose.connection.close();
}

seedData();
