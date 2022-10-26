// const client = require("../middleware/postgresClient");
const client = require("../middleware/postgresClient");


/*
@name: createUser
@params: uid, userName, password, carType, displayName, carType, displayName, friends, numDrives, profilePhotoURL
@desc: Generates a prepared statement to inject values into the correct fields via postgresql
@return: true if user was successfully created
*/
const createUser = async (
  uid,
  userName,
  password,
  carType,
  displayName,
  numDrives,
  profilePhotoURL
) => {
  const text =
    'INSERT INTO public.users(uid, "userName", password, "carType", "displayName", "numDrives", "profileURL") VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *';
  const values = [
    uid,
    userName,
    password,
    carType,
    displayName,
    numDrives,
    profilePhotoURL,
  ];
  const response = await client
    .query(text, values)
    .then((res) => {
      console.log(res.rows[0]);
      return true;
    })
    .catch((e) => {
      console.error(e.stack);
      return false;
    });

  return response;
};

/*
@name: readUser
@params: user unique id (uid)
@desc: queries user database using user UID to generate an array of user info.
@return: Array of user information
*/
const readUser = async (uid, userName, isPass) => {
  let text;
  let values;
  //handles the lookup of a user when UID is not known
  console.log({ uid, userName, isPass });
  if (!userName) {
    text =
      isPass === true
        ? "SELECT * FROM public.users WHERE uid LIKE $1"
        : `SELECT uid, "userName", "carType", "displayName", "numDrives", "profileURL" FROM public.users WHERE uid LIKE $1`;
    values = [uid];
    //handles the lookup of a user when the UID is known, this is the preffered option
  } else if (!uid || (uid && userName)) {
    text =
      isPass === true
        ? 'SELECT * FROM public.users WHERE "userName" LIKE $1'
        : `SELECT uid, "userName", "carType", "displayName", "numDrives", "profileURL" FROM public.users WHERE "userName" LIKE $1`;
    values = [userName];
  }

  console.log({ text, uid });

  const response = await client
    .query(text, values)
    .then((res) => {
      console.log("resRows", res.rows[0]);
      return res.rows;
    })
    .catch((e) => {
      console.error(e.stack);
      return false;
    });

  return response[0];
};

/*
@name: updateUser
@params: unique user identifier (UID), users displayName(displayName)(optional), users new password (password)(optional)
@desc: takes required user ID and an optional displayName or optional password and will conditionally update the fields in the database as specified by the params.
@return: true if updated successfully, false if not
*/
const updateUser = (uid, displayName, password) => {
  // get uid
  let text;
  let values;
  if (!uid) {
    console.error("UID must exist");
  }
  //allows the update of a users displayname, the displayname and username are different and username should be a unique key enforced further upstream
  else if (!displayName) {
    text =
      'UPDATE public.users SET "password" = $2 WHERE uid LIKE $1 RETURNING *;';
    values = [uid, password]; //
  }
  //allows the update of a users password, this should not be plain text and should be salted further upstream
  else if (!password) {
    text =
      'UPDATE public.users SET "displayName" = $2 WHERE uid LIKE $1 RETURNING *;';
    values = [uid, displayName];
  }

  client
    .query(text, values)
    .then((res) => {
      console.log(res.rows[0]);
    })
    .catch((e) => console.error(e.stack));
};
/*
@name: deleteUser
@params: User unique ID (UID)
@desc: takes uid of user profile to be deleted and removes the user entry in the database.
@return: return true if user was successfully deleted. 
*/
const deleteUser = async (uid) => {
  //removes a user completely from the table, this function has no verification, and once its called, the user row is removed, that verification should be handled further down stream
  const text = "DELETE FROM public.users where uid LIKE $1 returning *;";
  const values = [uid];
  try {
    const res = await client
      .query(text, values)
      .then((res) => {
        console.log(res.rows[0]);
        return true
      })
      .catch((e) => {
        console.error(e.stack)
        return false
      });

      return res
  
  } catch (e) {
    console.log("deleteUser err")
  }
};

module.exports = { createUser, readUser, updateUser, deleteUser };
