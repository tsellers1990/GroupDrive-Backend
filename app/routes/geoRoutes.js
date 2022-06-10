const { write, read, readOne } = require("../middleware/mongoConnection");
const router = require("express").Router();

router.get("/getBulk", async (req, res) => {
  const data = await read();

  res.send(data);
});

router.get("/getOne", async (req, res) => {
  const data = await read();

  res.send(data);
});

// ! post route
router.put("/", async (req, res) => {
  const { uid, userName, coordinate, isOnline } = req.query;
  const data = await write(uid, userName, coordinate, isOnline);
  //? also something to send off

  console.log({ data });
  if (data) {
    res.send(200);
  }else {
    res.send(500);
  }
});

//

module.exports = router;
