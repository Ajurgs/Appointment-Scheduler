const router = require("express").Router();

router.get("/account", withAuth, async (req, res) => {
  // send to user accounts
});

module.exports = router;
