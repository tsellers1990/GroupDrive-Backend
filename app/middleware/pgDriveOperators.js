const { client } = require("../middleware/postgresClient");
/*
This is where the operators for creating, updating and canceling drives will be the functions to be implemented are outlined
Create - This will create a drive, it will take in the orginizerUID, geoJSON ID in mongo, date its occuring, driver limits, and if its a reoccuring meet, topicID of GroupChat
Update - will take the same options as create, but they will be optional and will update them in place on the database
Cancel - This will update the drive to canceled
Happened - this will update the drive to it being past tense

Of note, none of the drives will be removed to retain historical records of drives that have happened
 */

const createDrive = async (
  orginizerUID,
  geoMongoId,
  dateOccuring,
  createdAt
) => {
  const driveId = Math.ceil(Math.random() * 1000000000);

  console.log({ driveId, orginizerUID, geoMongoId, dateOccuring, createdAt });

  const text = `INSERT INTO public.drives("driveId", "orginizerUID", "geoMongoId", "dateOccuring", "createdAt") VALUES ($1,$2,$3,$4,$5) RETURNING *`;
  const values = [driveId, orginizerUID, geoMongoId, dateOccuring, createdAt];

  const response = await client
    .query(text, values)
    .then((res) => {
      console.log(res.rows[0]);
      return true;
    })
    .catch((e) => {
      console.error(e.stack);
      return { err: e };
    });

  if (!response.err) {
    return { response, driveId };
  } else {
    return { response };
  }
};

const readDrives = async () => {
  const text = `SELECT * FROM public.drives`;
  //  WHERE "driveId" LIKE $1

  //  const values = [driveId];

  // console.log({ text, values });

  const response = await client
    .query(text)
    .then((res) => {
      console.log("resRows", res.rows[0]);
      return res.rows;
    })
    .catch((e) => {
      console.error(e.stack);
      return false;
    });

  return response;
};

const updateDrive = (
  driveId,
  orginizerUID,
  geoMongoId,
  dateOccuring,
  createdAt
) => {
  const text = `UPDATE public.drives SET "orginizerUID" = $2, "geoMongoId" = $3, "dateOccuring" = $4, "createdAt" = $5 WHERE "driveId" = $1 RETURNING *`;
  const values = [driveId, orginizerUID, geoMongoId, dateOccuring, createdAt];
  // TODO: should we update createdAt?
  // TODO: If a value is undefined don't replace it with null
  client
    .query(text, values)
    .then((res) => {
      console.log(res.rows[0]);
    })
    .catch((e) => console.error(e.stack));
};

const deleteDrive = async (driveId) => {
  //removes a user completely from the table, this function has no verification, and once its called, the user row is removed, that verification should be handled further down stream
  const text = `DELETE FROM public.drives where "driveId" = $1 returning *;`;
  const values = [driveId];

  try {
    const res = await client
      .query(text, values)
      .then((res) => {
        console.log(res.rows[0]);
        return true;
      })
      .catch((e) => {
        console.error(e.stack);
        return false;
      });

    return res;
    // 939200202
  } catch (e) {
    console.log("deleteDrive err, add err handling frfr");
    // TODO: add err handling, frfr this time though
  }
};

module.exports = { createDrive, readDrives, deleteDrive, updateDrive };
