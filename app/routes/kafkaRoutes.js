const router = require("express").Router();
const {test} = require("../middleware/kafkaChat");

router.get("/kafkaMeme", async (req, res) => {
    // const data = await create();
    await test();
    // return(
        console.log("kafka route successful")
        res.status(200).send("woot this works 2")

    // );
     // res.send(data);
});

module.exports = router;