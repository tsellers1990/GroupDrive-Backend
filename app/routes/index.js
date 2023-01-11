const router = require("express").Router();

const firebaseMiddle = require("../middleware/authMiddleware/index");


const geoRoutes = require("./geoRoutes");
const chatRoutes = require("./chatRoutes");
const userRoutes = require("./userRoutes")
const friendRoutes = require("./friendRoutes")
const driveRoutes = require("./driveRoutes")
const liveUserRoutes = require("./liveUserRoutes")
const authRoutes = require("./authRoutes");


router.use("/geo", geoRoutes)
router.use("/chat", chatRoutes)
router.use("/user", userRoutes)
router.use("/friend", friendRoutes)
router.use("/drive", driveRoutes)
router.use("/liveLocation", liveUserRoutes)

// router.use(firebaseMiddle.decodeToken)
router.use("/auth", authRoutes)



module.exports = router