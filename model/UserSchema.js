const mongoose = require("mongoose");
const AddrSchema = require("./AddressSchema");
const { Schema } = mongoose;
const bcrypt = require("bcrypt");

const UserSchema = new Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, lowercase: true, unique: true },
    password: { type: String, required: true },
    address: { type: AddrSchema },
  },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

UserSchema.virtual("fullname")
  .get(function () {
    return this.firstname + " " + this.lastname;
  })
  .set(function (name) {
    let names = name.split(" ");
    this.firstname = names[0];
    this.lastname = names[1];
  });

UserSchema.pre("save", function () {
  console.log(this);
  let salt = bcrypt.genSaltSync(10);
  this.password = bcrypt.hashSync(this.password, salt);
});

const UsersModel = mongoose.model("users", UserSchema);
module.exports = UsersModel;
