// Set up utility requirements
const router = require("express").Router();
const withAuth = require("../utils/auth");
const { User, Role, Appointment } = require("../models");
const calendar = require("fullcalendar-scheduler");

// Render user profile upon verification
router.get("/profile", (req, res) => {
    try {
      res.render("userprofile");
    } catch (err) {
      res.status(500).json(err);
    }
  });

  // Export session information
  module.exports = router;