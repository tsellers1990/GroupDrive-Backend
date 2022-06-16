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
  driverLimit,
  reoccuring
  // ! what else do we need?
) => {
  const text =
    'INSERT INTO public.drives("orginizerUID", "geoMongoId", "dateOccuring", "driverLimit", "reoccuring") VALUES ($1,$2,$3,$4,$5) RETURNING *';
  const values = [
    orginizerUID,
    geoMongoId,
    new Date(JSON.parse(dateOccuring)),
    driverLimit,
    reoccuring,
  ];

  try {
    const response = await client
      .query(text, values)
      .then((res) => {
        console.log({ res });
        return res;
      })
      .catch((e) => {
        return e;
      });

    return response;
  } catch (e) {
    return e
  }
};

module.exports = { createDrive };
