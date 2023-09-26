const mongoose = require("mongoose");
const { Schema, Types } = require("mongoose");

const reactionSchema = new Schema({
  reactionBody: {
    type: String,
    required: true,
    maxlength: 280,
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (createdAt) => new Date(createdAt).toLocaleString(),
  },
});

const Reaction = mongoose.model("Reaction", reactionSchema);

module.exports = Reaction;
