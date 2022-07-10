const { write, read, readOne } = require("../middleware/mongoConnection");
const router = require("express").Router();

router.get("/", async (req, res) => {

  if(req.body.uid) {
    const data = readOne(req.body.uid);

    data.then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    })

  } else {
    const data = read();
  
    data.then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    })
  }

});

// ! post route
router.post("/", async (req, res) => {
  console.log('req.body',req.body);
  const { uid, userName, coordinate, isOnline } = req.body;
  const data = write(uid, userName, coordinate, isOnline);
  //? also something to send off

  data.then((data) => {
    res.sendStatus(201);
  })
  .catch((err) => {
    console.log(err);
    res.sendStatus(500);
  })
});

//

module.exports = router;
