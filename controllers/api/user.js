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
      res
        .status(404)
        .json({
          message: "The User you were attempting to locate was not found.",
        });
      return;
    }
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const userData = await User.create(req.body);
    res.status(200).json(userData);
  } catch (err) {
    res.status(400).json(err);
  }
});

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
      res
        .status(404)
        .json({
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
