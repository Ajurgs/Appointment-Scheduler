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
  const userData = await User.findByPk(req.session.userId,{
    include:[{model:Role}],
    attributes: {exclude:["password","roleId", "createdAt","updatedAt"]},
  })
  const user = userData.get({plain:true});
  console.log(user);
  // send to user accounts
  switch(user.role.id){
    case 1:{
      res.render("customerAccount",{
        user,
        loggedIn: req.session.loggedIn,
      });
      break;
    }
    case 2:{
      res.render("employeeAccount",{
        user,
        loggedIn: req.session.loggedIn,
      });
      break;
    }
    case 3:{
      res.render("managerAccount",{
        user,
        loggedIn: req.session.loggedIn,
      });
      break;
    }
    default:{
      res.render("login");
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
