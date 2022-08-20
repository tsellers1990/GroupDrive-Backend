const router = require("express").Router();
const {
  createDrive,
  readDrives,
  deleteDrive,
  updateDrive,
} = require("../middleware/pgDriveOperators");

const { writeGeo } = require("../middleware/mongoConnection");
const { addDrivemember } = require("../middleware/pgDriveMemberOperators");

// * GroupDrives
router.get("/drives", async (req, res) => {
  const result = await readDrives();
  console.log(result);
  if (!result.err) {
    res.send(result);
  } else {
    res.status(500).send(result);
  }
});

router.put("/createDrive", async (req, res) => {
  const { orginizerUID, dateOccuring, geoJSONData } = req.query;

  const createdAt = new Date().getTime();

  const data = await writeGeo(geoJSONData);
  const geoId = data.id;

  const result = await createDrive(
    orginizerUID,
    geoId,
    dateOccuring,
    createdAt
  );

  if (!result?.err) {
    res.send(result);
  } else {
    res.status(500).send(result);
  }
});

router.delete("/delete", async (req, res) => {
  const { driveId } = req.query;

  const result = await deleteDrive(driveId);
  if (!result.err) {
    res.send(result);
  } else {
    res.status(500).send(result);
  }
});

router.put("/update", async (req, res) => {
  const { driveId, orginizerUID, geoMongoId, dateOccuring } = req.query;

  const createdAt = new Date().getTime();

  const result = await updateDrive(
    driveId,
    orginizerUID,
    geoMongoId,
    dateOccuring,
    createdAt
  );

  if (!result?.err) {
    res.send(result);
  } else {
    res.status(500).send(result);
  }
});

// * Drive Members
router.get("/driveMem", async (req, res) => {
  //   const result = await temp();
  //   console.log(result);
  //   if (result) {
  //     console.log({ result });
  //   }
});

router.put("/driveMem", async (req, res) => {
  const { driveId, memberUid } = req.query;

  const result = await addDrivemember(driveId, memberUid);
  if (result) {
    res.json(result)
  } else {
    res.json({err: true, res})
  }
});

router.delete("/driveMem", async (req, res) => {
  //   const result = await temp();
  //   console.log(result);
  //   if (result) {
  //     console.log({ result });
  //   }
});

module.exports = router;
