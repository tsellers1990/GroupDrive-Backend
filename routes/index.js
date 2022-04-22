const router = require("express").Router();

const firebaseRoutes = require("./firebaseRoutes");

router.use("/db", firebaseRoutes);

module.exports = router