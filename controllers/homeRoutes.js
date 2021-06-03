const router = require("express").Router();
const withAuth = require("../utils/auth");
const { User, Role, Appointment } = require("../models");
const calendar = require("fullcalendar-scheduler");

// localhost:3001/
router.get("/", async (req, res) => {
  try {
    res.render("homepage", {
      // Pass the logged in flag to the template
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/account", withAuth, async (req, res) => {
  // send to user accounts
  switch(req.session.role){
    case 1:{
      res.render("customerAccount");
      break;
    }
    case 2:{
      res.render("employeeAccount");
      break;
    }
    case 3:{
      res.render("managerAccount");
      break;
    }
    default:{
      break;
    }
  }
});

router.get("/login", (req, res) => {
  try {
    res.render("login");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/signup", (req, res) => {
  try {
    res.render("signup");
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
