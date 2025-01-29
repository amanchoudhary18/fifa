const express = require("express");
const Team = require("../models/team.model");
const Match = require("../models/match.model");
require("dotenv").config("../.env");

const router = express.Router();

router.post("/team", async (req, res) => {
  try {
    const team = new Team(req.body);
    await team.save();
    res.status(201).json(team);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/teams", async (req, res) => {
  try {
    const teams = await Team.find();
    res.json(teams);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/team/:id", async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);
    if (!team) return res.status(404).json({ message: "Team not found" });
    res.json(team);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/team/:id", async (req, res) => {
  try {
    const team = await Team.findByIdAndDelete(req.params.id);
    if (!team) return res.status(404).json({ message: "Team not found" });
    res.json({ message: "Team deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/match", async (req, res) => {
  try {
    const match = new Match(req.body);
    await match.save();
    res.status(201).json(match);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/match/:id", async (req, res) => {
  try {
    const match = await Match.findOne({ matchId: req.params.id }).populate(
      "team1 team2ID winner"
    );
    if (!match) return res.status(404).json({ message: "Match not found" });
    res.json(match);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/matches", async (req, res) => {
  try {
    const matches = await Match.find().populate("team1ID team2ID winner");
    const winCounts = {};

    matches.forEach((match) => {
      if (match.winner) {
        winCounts[match.winner] = (winCounts[match.winner] || 0) + 1;
      }
    });

    const sortedWinners = Object.entries(winCounts)
      .sort((a, b) => b[1] - a[1])
      .map((entry) => entry[0]);

    res.json({ matches, sortedWinners });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
