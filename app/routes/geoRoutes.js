const { write, read, readOne } = require("../middleware/mongoConnection");
const router = require("express").Router();

router.get("/getBulk", async (req, res) => {
  const data = await read();

  res.send(data);
});

router.get("/:uid", async (req, res) => {
  const { uid } = req.params;

  const data = await readOne(uid);

  res.send(data);
});

// ! post route
router.post("/", async (req, res) => {
  const { uid, userName, coordinate, isOnline } = req.body;
  const data = await write(uid, userName, coordinate, isOnline);
  //? also something to send off

  console.log({ data });
  if (data) {
    res.sendStatus(200);
  } else {
    res.sendStatus(500);
  }
});

//

module.exports = router;
