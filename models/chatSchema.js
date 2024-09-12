const { timeStamp } = require("console");
const mongoose = require("mongoose");
const { type } = require("os");

const chatSchema = mongoose.Schema(
  {
    to: { type: String, required: true },
    from: { type: String, required: true },
    message: { type: String, required: true },
  },
  { timestamps: true }
);

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;
