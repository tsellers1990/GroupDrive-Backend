const router = require("express").Router();
const {temp} = require("../middleware/pgDriveMemberOperators")

// * Drives
router.get("/drive", async (req, res) => {
    const result = await temp()

    console.log(result)

    if (result) {
        console.log({result})
    } else {
        console.log({result})
    }
});

router.put("/drive", async (req, res) => {
    const result = await temp()

    console.log(result)

    if (result) {
        console.log({result})
    }
});

router.delete("/drive", async (req, res) => {
    const result = await temp()

    console.log(result)

    if (result) {
        console.log({result})
    }
});



// * Drive Members
router.get("/driveMem", async (req, res) => {
    const result = await temp()

    console.log(result)

    if (result) {
        console.log({result})
    }
});

router.put("/driveMem", async (req, res) => {
    const result = await temp()

    console.log(result)

    if (result) {
        console.log({result})
    }
});

router.delete("/driveMem", async (req, res) => {
    const result = await temp()

    console.log(result)

    if (result) {
        console.log({result})
    }
});

module.exports = router;