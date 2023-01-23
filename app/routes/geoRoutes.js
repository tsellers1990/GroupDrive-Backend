const {
  writeGeo,
  readGeo,
  readOneGeo,
} = require("../middleware/mongoConnection");

const { createDrive } = require("../middleware/pgDriveOperators");
const firebaseMiddle = require("../middleware/authMiddleware/index");


const router = require("express").Router();

router.get("/", firebaseMiddle.decodeToken, async (req, res) => {
  if (req.body.postGresID) {
    const data = readOneGeo(req.body.postGresID);

    data
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(500);
      });
  } else {
    const data = readGeo();
    data
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(500);
      });
  }
});

// ! post route
router.post("/", firebaseMiddle.decodeToken, async (req, res) => {
  const { geoJSONData } = req.body;
  const data = writeGeo(geoJSONData);
  data
    .then((response) => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});


module.exports = router;
