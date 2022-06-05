const router = require("express").Router();

const mongoRoutes = require("./mongoRoutes");
const sqlRoutes = require("./sqlRoutes");
// const redisRoutes = require("./brokerRoutes");
// const brokerRoutes = require("./brokerRoutes");

// router.use("/db", firebaseRoutes);

router.use("/mongo", mongoRoutes)
router.use("/sql", sqlRoutes)
// router.use("/redis", redisRoutes)
// router.use("/broker", brokerRoutes)

// localhost:9000/mongo/post



module.exports = router