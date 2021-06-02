const router = require("express").Router();
const withAuth = require("../utils/auth");

router.get("/account", withAuth, async (req, res) => {
  // send to user accounts
});
router.get("/signup", (req, res) => {
  try {
    res.render("signup");
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
