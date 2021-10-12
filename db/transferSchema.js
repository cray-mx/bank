const mongoose = require("mongoose");

const transferSchema = new mongoose.Schema(
  {
    sender: {
      type: String,
    },
    senderEmail: {
      type: String,
    },
    recipient: {
      type: String,
    },
    recipientEmail: {
      type: String,
    },
    amount: {
      type: Number,
    },
  },
  { timestamps: true }
);

const transferModel = mongoose.model("transfer", transferSchema);

module.exports = transferModel;
