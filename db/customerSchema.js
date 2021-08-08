const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    gender: {
      type: String,
    },
    balance: {
      type: Number,
    },
  },
  { timestamps: true }
);

const customerModel = mongoose.model("customer", customerSchema);
module.exports = customerModel;
