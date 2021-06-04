// Establish route requirements
const router = require("express").Router();

const apiRoutes = require("./api");
const homeRoutes = require("./homeRoutes");

router.use("/api", apiRoutes);
router.use("/", homeRoutes);

// Export session information
module.exports = router;
