const router = require("express").Router();
const { Role } = require("../../models");

router.get("/", async (req, res) => {
  try {
    const roleData = await Role.findAll();
    res.status(200).json(roleData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const roleData = await Role.findByPk(req.params.id);
    if (!roleData) {
      res.status(404).json({ message: "The Role was not found." });
      return;
    }
    res.status(200).json(roleData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const roleData = await Role.create(req.body);
    res.status(200).json(roleData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const roleData = await Role.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!roleData[0]) {
      res.status(404).json({ message: "The Role was not able to be updated." });
      return;
    }
    res.status(200).json();
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const roleData = await Role.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!roleData) {
      res
        .status(404)
        .json({ message: "The Role you were trying to delete was not found." });
      return;
    }

    res.status(200).json();
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
