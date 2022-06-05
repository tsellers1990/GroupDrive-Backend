const router = require("express").Router();
const {temp} = require("../middleware/pgDriveMemberOperators")

// * Drives
router.get("/drive", async (req, res) => {
    const result = await temp()
});

router.put("/drive", async (req, res) => {
    const result = await temp()
});

router.delete("/drive", async (req, res) => {
    const result = await temp()
});



// * Drive Members
router.get("/driveMem", async (req, res) => {
    const result = await temp()
});

router.put("/driveMem", async (req, res) => {
    const result = await temp()
});

router.delete("/driveMem", async (req, res) => {
    const result = await temp()
});

module.exports = router;