const router = require("express").Router();

const geoRoutes = require("./geoRoutes");
const chatRoutes = require("./chatRoutes");
const userRoutes = require("./userRoutes")
const friendRoutes = require("./friendRoutes")
const driveRoutes = require("./driveRoutes")
const kafkaRoutes = require("./kafkaRoutes")

router.use("/geo", geoRoutes)
router.use("/chat", chatRoutes)
router.use("/user", userRoutes)
router.use("/friend", friendRoutes)
router.use("/drive", driveRoutes)
router.use("/kafka", kafkaRoutes)


module.exports = router