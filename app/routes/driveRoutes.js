const router = require("express").Router();
const { createDrive } = require("../middleware/pgDriveOperators");

// * Drives
// router.get("/drive", async (req, res) => {
//   const result = await temp();

//   console.log(result);

//   if (result) {
//     console.log({ result });
//   } else {
//     console.log({ result });
//   }
// });

router.put("/createDrive", async (req, res) => {
  const {
    driveId,
    orginizerUID,
    geoMongoId,
    dateOccuring,
    driverLimit,
    reoccuring,
    createdAt,
  } = req.query;

//   const dateOccurFormatted = new Date(JSON.parse(dateOccuring));

//   console.log({ dateOccurFormatted });

  const result = await createDrive(
    driveId,
    orginizerUID,
    geoMongoId,
    dateOccuring,
    driverLimit,
    reoccuring,
    createdAt
  );

  console.log({ result });
  if (result.name === "error") {
    res.status(500).send(result);
  } else {
    res.json(result);
  }
});

// router.delete("/drive", async (req, res) => {
//   const result = await temp();

//   console.log(result);

//   if (result) {
//     console.log({ result });
//   }
// });

// // * Drive Members
// router.get("/driveMem", async (req, res) => {
//   const result = await temp();

//   console.log(result);

//   if (result) {
//     console.log({ result });
//   }
// });

// router.put("/driveMem", async (req, res) => {
//   const result = await temp();

//   console.log(result);

//   if (result) {
//     console.log({ result });
//   }
// });

// router.delete("/driveMem", async (req, res) => {
//   const result = await temp();

//   console.log(result);

//   if (result) {
//     console.log({ result });
//   }
// });

module.exports = router;
