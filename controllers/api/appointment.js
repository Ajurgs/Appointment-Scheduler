const router = require("express").Router();
const { Appointment, User, Role } = require("../../models");

// The `/api/appointments` endpoint

router.get("/", async (req, res) => {
  // find all appointments
  try {
    const appointmentData = await Appointment.findAll({
      include:[{model:User, as:"requester", attributes: ["firstName","lastName","roleId"], include:[Role]},{model:User, as:"attending",attributes: ["firstName","lastName","roleId"], include:[Role] }],
      attributes: {exclude:["requesterId","attendingId"]}
    });
    res.status(200).json(appointmentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const appointmentData = await Appointment.findByPk(req.params.id, {
      include:[{model:User, as:"requester", attributes: ["firstName","lastName","roleId"], include:[Role]},{model:User, as:"attending",attributes: ["firstName","lastName","roleId"], include:[Role] }],
      attributes: {exclude:["requesterId","attendingId"]}
    });
    if (!appointmentData) {
      res.status(404).json({ message: "The ID supplied does not exist." });
      return;
    }
    res.status(200).json(appointmentData);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get("/attending/:id",async (req,res)=>{
  try{
    const appointmentData = await Appointment.findAll({
      where:{
        attendingId : req.params.id,
      },
      include:[{model:User, as:"requester", attributes: ["firstName","lastName","roleId"], include:[Role]},{model:User, as:"attending",attributes: ["firstName","lastName","roleId"], include:[Role] }],
      attributes: {exclude:["requesterId","attendingId"]}
    })
    if (!appointmentData) {
      res.status(404).json({ message: "The ID supplied does not exist" });
      return;
    }
    res.status(200).json(appointmentData);
  }
  catch (err){
    res.status(500).json(err);
  }
})

router.post("/", async (req, res) => {
  try {
    const appointmentData = await Appointment.create(req.body);
    res.status(200).json(appointmentData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const appointmentData = await Appointment.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!appointmentData[0]) {
      res
        .status(404)
        .json({ message: "The Appointment could not be updated." });
      return;
    }
    res.status(200).json(appointmentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const appointmentData = await Appointment.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!appointmentData) {
      res
        .status(404)
        .json({
          message: "The Appointment you are trying to delete was not located.",
        });
      return;
    }

    res.status(200).json(appointmentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
