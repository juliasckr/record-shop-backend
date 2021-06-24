const mongoose = require("mongoose");
const { Schema } = mongoose;

const OrderSchema = new Schema({
  records: [
    {
      type: Schema.Types.ObjectId,
      ref: "records",
    },
  ],
  user: { type: Schema.Types.ObjectId, required: true, ref: "users" },
});

module.exports = mongoose.model("orders", OrderSchema);
