const router = require("express").Router();

const geoRoutes = require("./geoRoutes");
const chatRoutes = require("./chatRoutes");
const userRoutes = require("./userRoutes")
const friendRoutes = require("./friendRoutes")
const driveRoutes = require("./driveRoutes")
const kafkaRoutes = require("./kafkaRoutes")
const liveUserRoutes = require("./liveUserRoutes")


router.use("/geo", geoRoutes)
router.use("/chat", chatRoutes)
router.use("/user", userRoutes)
router.use("/friend", friendRoutes)
router.use("/drive", driveRoutes)
router.use("/kafka", kafkaRoutes)
router.use("/liveLocation", liveUserRoutes)



module.exports = router