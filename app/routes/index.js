const router = require("express").Router();

const mongoRoutes = require("./mongoRoutes");
const chatRoutes = require("./chatRoutes");
const userRoutes = require("./userRoutes")
const friendRoutes = require("./friendRoutes")
const driveRoutes = require("./driveRoutes")

router.use("/mongo", mongoRoutes)
router.use("/chat", chatRoutes)
router.use("/user", userRoutes)
router.use("/friend", friendRoutes)
router.use("/drive", driveRoutes)



module.exports = router