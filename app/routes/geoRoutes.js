const { writeGeo, readGeo, readOneGeo } = require("../middleware/mongoConnection");
const router = require("express").Router();

router.get("/", async (req, res) => {

  if(req.body.postGresID) {
    const data = readOneGeo(req.body.postGresID);

    data.then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    })

  } else {
    const data = readGeo();
  
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
  // destructure whatever you need from the req and pass into the postgres table  
  const {postGresID, geoJSONData} = req.body;

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
  //.catch((err) => {
  //  console.log(err)
  //  res.sendStatus(500);
  //})


  //get rid of this and do it all inside the first .then after postgres promise resolves
  const data = writeGeo(postGresID,geoJSONData);

  data.then(() => {
    res.sendStatus(201);
  })
  .catch((err) => {
    console.log(err);
    res.sendStatus(500);
  })
});

//

module.exports = router;
