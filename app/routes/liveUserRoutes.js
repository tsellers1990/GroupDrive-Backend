const { writeLocation, readLocation, readOneLocation } = require("../middleware/mongoConnection");
const router = require("express").Router();

router.get("/", async (req, res) => {

  if(req.body.uid) {
    const data = readOneLocation(req.body.uid);

    data.then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    })

  } else {
    const data = readLocation();
  
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
  const data = writeLocation(uid, userName, coordinate, isOnline);
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
