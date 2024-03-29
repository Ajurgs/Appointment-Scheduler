// Routes require User Role and Appointment with Full-Calendar
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

// Get authorization
router.get("/account", withAuth, async (req, res) => {
  const userData = await User.findByPk(req.session.userId,{
    include:[{model:Role}],
    attributes: {exclude:["password","roleId", "createdAt","updatedAt"]},
  })
  const user = userData.get({plain:true});
  console.log(user);
  // Send to user accounts to specify role
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
      res.render("login",{
        loggedIn: req.session.loggedIn,
      });
      break;
    }
  }
});

// Require session login
router.get("/login", (req, res) => {
  try {
    res.render("login",{
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Sign up for account
router.get("/signup", (req, res) => {
  try {
    res.render("signup",{
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get("/update",withAuth, async (req,res)=>{
  try {
    const userData = await User.findByPk(req.session.userId,{
      attributes: {
          exclude:["password","roleId", "createdAt","updatedAt"],
      }
    });
    const user = userData.get({plain:true});
    res.render("update",{
      user,
      loggedIn: req.session.loggedIn,
    })
  } catch (err) {
    res.status(500).json(err);
  }
})

router.get("/createappt",withAuth, async (req,res) =>{
  try {
    res.render("createAppt",{
      id:req.session.userId,
      loggedIn: req.session.loggedIn,
    })
  } catch (err) {
    res.status(500).json(err);
  }
})


router.get("/updateUser",withAuth, async (req,res)=>{
  try {
    res.render("userprofile",{
      loggedIn: req.session.loggedIn,
    })
  } catch (err) {
    res.status(500).json(err);
  }
})


router.get("/appointment/:id",withAuth, async (req,res) =>{
  try{
    const appointmentData = await Appointment.findByPk(req.params.id,{
      include:[{model:User, as:"requester", attributes: ["firstName","lastName","roleId"], include:[Role]},{model:User, as:"attending",attributes: ["firstName","lastName","roleId"], include:[Role] }],
      attributes: {exclude:["requesterId","attendingId"]}
    });
    if(!appointmentData){
      res.status(404).json({message:"The Id supplied does not exist"});
    }
    const appointment = appointmentData.get({plain:true});
    console.log(appointment)
    const employeeData = await User.findAll({
      where:{
        roleId:2,
      }
    })
    if(!employeeData){
      res.status(404).json({message:"No Employees found"});
    }
    const employees = employeeData.map(entry =>entry.get({plain:true}));
    res.render("editAppt",{
      appointment,
      employees,
      loggedIn:req.session.loggedIn,
    });
  }
  catch (err){
    console.log(err);
    res.status(500).json(err);
  }
})

// Export session information

module.exports = router;
