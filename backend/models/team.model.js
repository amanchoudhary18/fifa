const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema(
  {
    player1: {
      type: String,
      required: true,
    },
    player2: {
      type: String,
      required: true,
    },
    teamName: {
      type: String,
      required: true,
      unique: true,
    },
    teamLevel: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      required: true,
    },
  },
  { timestamps: true }
);

const Team = mongoose.model("Team", teamSchema);

module.exports = Team;
