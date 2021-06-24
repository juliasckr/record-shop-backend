const mongoose = require("mongoose");
const { Schema } = mongoose;

const AddrSchema = new Schema({
  street: {
    type: String,
    required: true,
  },
  city: { type: String, required: true },
});

module.exports = AddrSchema;
