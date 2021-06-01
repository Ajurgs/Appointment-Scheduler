const router = require("express").Router();
const appointment = require("./appointment.js");
const role = require("./role.js");
const user = require("./user.js");

router.use("/user", user);
router.use("/appointment", appointment);
router.use("/role", role);

module.exports = router;
