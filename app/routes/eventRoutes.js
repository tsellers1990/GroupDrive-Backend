const router = require("express").Router();
const {
  createEvent,
  readEvent,
  deleteEvent,
  updateEvent,
} = require("../middleware/pgEventOperators");

const { writeGeo } = require("../middleware/mongoConnection");
const {
  addDriveMember,
  removeDriveMember,
} = require("../middleware/pgDriveMemberOperators");
const firebaseMiddle = require("../middleware/authMiddleware/index");


// * GroupDrives
router.get("/events", async (req, res) => {
  const result = await readEvent();
  console.log(result);
  if (!result.err) {
    res.send(result);
  } else {
    res.status(500).send(result);
  }
});

router.put("/createEvent", firebaseMiddle.decodeToken,  async (req, res) => {
  const { orginizerUID, dateOccuring, geoJSONData, driveTitle, date, time, destination } =
    req.query;

  const createdAt = new Date().getTime();

  const data = await writeGeo(geoJSONData);
  const geoId = data.id;

  const result = await createEvent(
    orginizerUID,
    geoId,
    dateOccuring,
    driveTitle,
    destination,
    date,
    time, 
  );

  if (!result?.err) {
    res.send(result);
  } else {
    res.status(500).send(result);
  }
});

router.delete("/delete", firebaseMiddle.decodeToken,  async (req, res) => {
  const { driveId } = req.query;

  const result = await deleteEvent(driveId);
  if (!result.err) {
    res.send(result);
  } else {
    res.status(500).send(result);
  }
});

router.put("/update", firebaseMiddle.decodeToken,  async (req, res) => {
  const { driveId, orginizerUID, geoMongoId, dateOccuring } = req.query;

  const createdAt = new Date().getTime();

  const result = await updateEvent(
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
router.get("/driveMem", firebaseMiddle.decodeToken,  async (req, res) => {
  //   const result = await temp();
  //   console.log(result);
  //   if (result) {
  //     console.log({ result });
  //   }
});

router.put("/driveMem", firebaseMiddle.decodeToken,  async (req, res) => {
  const { driveId, memberUid } = req.query;

  const result = await addDriveMember(driveId, memberUid, true);
  if (result) {
    res.json(result);
  } else {
    res.json({ err: true, res });
  }
});

router.delete("/driveMem", firebaseMiddle.decodeToken,  async (req, res) => {
  const { driveId, memberUid } = req.query;

  const result = await removeDriveMember(driveId, memberUid, true);
  if (result) {
    res.json(result);
  } else {
    res.json({ err: true, res });
  }
});

module.exports = router;
