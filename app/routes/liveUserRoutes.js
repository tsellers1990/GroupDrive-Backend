const {
  writeLocation,
  readLocation,
  readOneLocation,
} = require("../middleware/mongoConnection");
const router = require("express").Router();

router.get("/", async (req, res) => {
  if (req.body.uid) {
    const data = readOneLocation(req.body.uid);

    data
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(500);
      });
  } else {
    console.log("getting all userGeos");
    const locations = readLocation();
    locations
      .then((data) => {
        const arr = data
          .filter((userBlock) => {
            // if (req.params.requesterUid !== userBlock._id) {
            return true;
            // }
          })
          .map((dave) => {
            const { coordinate, _id, userName } = dave;
            return {
              uid: _id,
              userName,
              coordinate,
            };
          });

        res.status(200).send(arr);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(500);
      });
  }
});

// ! post route
router.put("/", async (req, res) => {
  console.log("req.body", req.query);
  const { uid, userName, coordinate, isOnline = true } = req.query;
  console.log({ uid });
  if(coordinate?.latitude && coordinate?.longitude){
    const data = writeLocation(uid, userName, coordinate, isOnline);
    //? also something to send off
  
    data
      .then((data) => {
        res.sendStatus(201);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(500);
      });
  } else {
    res.sendStatus(500)
  }
});

//

module.exports = router;
