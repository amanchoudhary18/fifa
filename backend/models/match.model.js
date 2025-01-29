const { default: mongoose } = require("mongoose");

const matchSchema = new mongoose.Schema(
  {
    matchId: {
      type: String,
      required: true,
      unique: true,
    },
    team1: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
      required: true,
    },
    team2: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
      required: true,
    },
    winner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
    },
    team1Goals: {
      type: Number,
      required: true,
    },
    team2Goals: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Match = mongoose.model("Match", matchSchema);

module.exports = Match;
