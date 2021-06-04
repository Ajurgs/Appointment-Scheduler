// Set up utility requirements
const router = require("express").Router();
const withAuth = require("../utils/auth");
const { User, Role, Appointment } = require("../models");
const calendar = require("fullcalendar-scheduler");

// Render user profile upon verification
router.get("/profile", withAuth,(req, res) => {
    try {
      res.render("userprofile",{
        loggedIn: req.session.loggedIn,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

router.get("/appointment/:id"), withAuth,(req,res) =>{
  try{
    const appointmentData = await Appointment.findByPk(req.params.id, {
      include:[{model:User, as:"requester", attributes: ["firstName","lastName","roleId"], include:[Role]},{model:User, as:"attending",attributes: ["firstName","lastName","roleId"], include:[Role] }],
      attributes: {exclude:["requesterId","attendingId"]}
    });
    if (!appointmentData) {
      res.status(404).json({ message: "The ID supplied does not exist." });
      return;
    }
    const appointment = appointmentData.get({plain:true});
    const employeeData = await User.findAll({
      where:{
        roleId:2,
      }
    })
    if(!employeeData){
      res.status(404).json({ message: "No Employees Found" });
      return;
    }
    const employees = employeeData.get({plain:true});
    res.render("editAppt",{
      appointment,
      employees,
      loggedIn: req.session.loggedIn,
    }
    )
  }
  catch (err){
    res.status(500).json(err);
  }
}

  // Export session information
  module.exports = router;