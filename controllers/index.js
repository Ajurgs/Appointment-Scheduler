const router = require("express").Router();

const apiRoutes = require("./api");
const homeRoutes = require("./homeRoutes");
const managerRoutes = require("./managerRoutes");

router.use("/api", apiRoutes);
router.use("/", homeRoutes);
router.use('/manager', managerRoutes);

module.exports = router;
