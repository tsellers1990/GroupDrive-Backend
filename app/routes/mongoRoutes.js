const { db, write, read } = require("../middleware/mongoConnection");
const router = require("express").Router();

router.get("/", async (req, res) => {
  const data = await read();

  res.send(data);
});

// ! post route
router.put("/", async (req, res) => {
  const { uid, userName, coordinate, isOnline } = req.body;

  const data = await write(uid, userName, coordinate, isOnline);
  //? also something to send off\

  res.send(200);
});

//

module.exports = router;
