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
    // console.log("getting all userGeos");
    const locations = readLocation();
    locations
      .then((data) => {
        const arr = data
          .filter((userBlock) => {
            if (req.params.requesterUid !== userBlock._id) {
            return true;
            }
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
        console.log("err", err);
        res.sendStatus(500);
      });
  }
});

// ! post route
router.put("/", async (req, res) => {
  // console.log("req.body", req.query);
  const { uid, userName, coordinate, isOnline = true } = req.query;
  // console.log(req.query);
  const parseCoords = JSON.parse(coordinate)
  if(parseCoords?.latitude && parseCoords?.longitude){
    const response = await writeLocation(uid, userName, parseCoords, isOnline);
    //? also something to send off

    console.log({response})
    if (response) {
      res.sendStatus(201)
    } else {
      res.sendStatus(500)
    }
  } else {
    // console.log("invalid coord.lat or long", coordinate["latitude"], coordinate.longitude)
    // console.log(coordinate)
    res.sendStatus(500)
  }
});

//

module.exports = router;
