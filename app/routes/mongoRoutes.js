const {db, write, read} = require("../middleware/mongoConnection")
const router = require("express").Router();


router.get("/", async (req, res) => {

    // read()
    //write();
    const data = await read()
    
    res.send(data)

});

// ! post route
router.put("/", (req, res) => {
  //? also something to send off
  res.send("what we return from put route");
});

//

module.exports = router;
