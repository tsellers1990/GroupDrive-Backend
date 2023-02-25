// ! incomplete
// * firebase operators

/*
@name: createJWT
@params: uid, userName, password, carType, displayName, carType, displayName, friends, numDrives, profilePhotoURL
@desc: Generates a prepared statement to inject values into the correct fields via postgresql
@return: true if user was successfully created
*/
const createUser = async (userName, password) => {
  const query = "firebase call stuff";
  const values = [userName, password];
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
@name: readJWT
@params: user unique id (uid)
@desc: queries user database using user UID to generate an array of user info.
@return: Array of user information
*/
const readJWT = async (userName, password) => {
  let text;
  let values;

  const query = "firebase stuff here";

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
