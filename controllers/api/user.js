const router = require("express").Router();
const { User, Role, Appointment } = require("../../models");

router.get("/", async (req, res) => {
  try {
    const userData = await User.findAll({
      include: [{ model: Role }],
    });
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const userData = await User.findByPk(req.params.id, {
      include: [{ model: Role }],
    });
    if (!userData) {
      res.status(404).json({
        message: "The User you were attempting to locate was not found.",
      });
      return;
    }
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});
// create user
router.post("/", async (req, res) => {
  try {
    const userData = await User.create(req.body);
    req.session.save(() => {
      req.session.userId = userData.id;
      req.session.role = userData.roleId;
      req.session.loggedIn = true;

      res.status(200).json({
        user: userData,
        message: "You are now Logged in",
      });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (!userData) {
      res.status(400).json("Incorrect Email or Password. Please Try Again");
      return;
    }
    const validPassword = await userData.checkPassword(req.body.password);
    if (!validPassword) {
      res.status(400).json("Incorrect Email or Password. Please Try Again");
      return;
    }
    const user = await userData.get({plain:true});
    console.log(user);
    req.session.save(() => {
      req.session.userId = user.id;
      req.session.role = user.roleId;
      req.session.loggedIn = true;
      console.log(req.session);
      res.status(200).json({
        user: userData,
        message: "You are now Logged in",
      });
    });
  } catch (err) {}
});

router.post("/logout", async (req,res)=>{
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
})

router.put("/:id", async (req, res) => {
  try {
    const userData = await User.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!userData[0]) {
      res.status(404).json({ message: "The User was not updated." });
      return;
    }
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const userData = await User.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!userData) {
      res.status(404).json({
        message: "The User you were attempting to delete was not found.",
      });
      return;
    }

    res.status(200).json();
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
