const router = require("express").Router();

const mongoRoutes = require("./mongoRoutes");
const chatRoutes = require("./chatRoutes");
const userRoutes = require("./userRoutes")
const friendRoutes = require("./friendRoutes")
const driveRoutes = require("./driveRoutes")
const kafkaRoutes = require("./kafkaRoutes")

router.use("/mongo", mongoRoutes)
router.use("/chat", chatRoutes)
router.use("/user", userRoutes)
router.use("/friend", friendRoutes)
router.use("/drive", driveRoutes)
router.use("/kafka", kafkaRoutes)


module.exports = router