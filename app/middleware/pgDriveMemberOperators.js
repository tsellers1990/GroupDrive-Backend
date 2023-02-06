const client = require("../middleware/postgresClient");
/*
This is where associating users to drives will take place, drives will not be stored here, it will operate similarly to the friends table
Add - will take two UIDs, the first being the driveUID and the second being the userUID and create an entry subscribing the user to the drive
Interested - will take two UIDs, the first being the driveUID and the second being the userUID and create an entry markign the user as interested in the drive
Remove - will take two UIDs, the first being the driveUID and the second being the userUID, this will remove the entry for the user being in/interested for the drive
*/

const getDriveMembers = async (driveId, isEvent = false) => {
  const text = `SELECT * FROM public.${
    isEvent ? "events" : "drives"
  } WHERE "driveId" = $1`;
  const values = [driveId];


  const response = await client
    .query(text, values)
    .then((res) => {
      return res.rows[0].driveMembers;
    })
    .catch((e) => {
      console.error(e.stack);
      return { err: e };
    });

  if (!response?.err) {
    return response;
  } else {
    return { response };
  }
};

const addDriveMember = async (driveId, memberUid, isEvent = false) => {
  const text = `UPDATE public.${
    isEvent ? "events" : "drives"
  } SET "driveMembers" = array_append("driveMembers",$2) WHERE "driveId" = $1 RETURNING *`;
  const values = [driveId, memberUid];

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

const removeDriveMember = async (driveId, memberUid, isEvent = false) => {
  const text = `UPDATE public.${
    isEvent ? "events" : "drives"
  } SET "driveMembers" = array_remove("driveMembers",$2) WHERE "driveId" = $1 RETURNING *`;
  const values = [driveId, memberUid];

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

module.exports = { addDriveMember, removeDriveMember, getDriveMembers };
