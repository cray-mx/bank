const mongoose = require("mongoose");

const transferSchema = new mongoose.Schema(
  {
    sender: {
      type: String,
    },
    recipient: {
      type: String,
    },
    senderEmailId: {
      type: String,
    },
    recipientEmailId: {
      type: String,
    },
  },
  { timestamps: true }
);

const transferModel = mongoose.model("transfer", transferSchema);

module.exports = transferModel;
