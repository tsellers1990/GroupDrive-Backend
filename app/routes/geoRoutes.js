const {
  writeGeo,
  readGeo,
  readOneGeo,
} = require("../middleware/mongoConnection");

const { createDrive } = require("../middleware/pgDriveOperators");

const router = require("express").Router();

router.get("/", async (req, res) => {
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
router.post("/", async (req, res) => {
  // destructure whatever you need from the req and pass into the postgres table
  const { geoJSONData } = req.body;
  console.log({ geoJSONData });

  //postgres.addToTable()
  //.then((postgresID) => {
  //    const data = writeGeo(postgresID, geoJSONData);
  //})
  //.catch((err) => {
  //  console.log(err);
  //  res.sendStatus(500)
  //})
  //.then(() => {
  //  res.sendStatus(201);
  //})

  //get rid of this and do it all inside the first .then after postgres promise resolves
  const data = writeGeo(geoJSONData);

  data
    .then((response) => {
      // call another
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

//

module.exports = router;
