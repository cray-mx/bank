const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
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
