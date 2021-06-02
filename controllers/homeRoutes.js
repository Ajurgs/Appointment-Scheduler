const router = require("express").Router();
const { User, Role, Appointment } = require("../models");
const calendar = require("fullcalendar-scheduler");

// localhost:3001/
router.get("/", async (req, res) => {
  try {
    res.render("calendar");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
