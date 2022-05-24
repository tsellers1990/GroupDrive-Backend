const { Client } = require("pg");
const client = new Client();
client.connect();
client.query("SELECT *", ["Hello world!"], (err, res) => {
  console.log(err ? err.stack : res.rows[0].message); // Hello World!
  client.end();
});
/*
@name: createUser
@params: uid, userName, password, carType, displayName, carType, displayName, friends, numDrives, profilePhotoURL
@desc: Generates a prepared statement to inject values into the correct fields via postgresql
@return: true if user was successfully created
*/
const createUser = (uid, userName, password, carType, displayName, friends, numDrives, profilePhotoURL) => {
  // uid, name, pass, email,
  const text = "INSERT INTO users(name, email) VALUES($1, $2) RETURNING *";
  const values = [uid, userName, password, carType, displayName, friends, numDrives, profilePhotoURL];
  client
    .query(text, values)
    .then((res) => {
      console.log(res.rows[0]);
    })
    .catch((e) => console.error(e.stack));
};

/*
@name: readUser
@params: user unique id (uid)
@desc: queries user database using user UID to generate an array of user info.
@return: Array of user information
*/
const readUser = (uid, userName) =>{
    let text;
    let values;
    if(!userName){
        text = "";
        values = [uid];
       
    } else if(!uid){
        text = ""
        values = [userName];
    }
    client
    .query(text, values)
    .then((res)=>{
        console.log(res.rows[0]);
    })
    .catch((e) => console.error(e.stack));
    
}


/*
@name: updateUser
@params: unique user identifier (UID), users displayName(displayName)(optional), users new password (password)(optional)
@desc: takes required user ID and an optional displayName or optional password and will conditionally update the fields in the database as specified by the params.
@return: true if updated successfully, false if not
*/
const updateUser = (uid, displayName, password) =>{
    // get uid
    const text = "";
    const values = [uid, displayName, password];
    client
    .query(text, values)
    .then((res)=>{
        console.log(res.rows[0]);
    })
    .catch((e) => console.error(e.stack));
    
}
/*
@name: deleteUser
@params: User unique ID (UID)
@desc: takes uid of user profile to be deleted and removes the user entry in the database.
@return: return true if user was successfully deleted. 
*/
const deleteUser = (uid) =>{
    // get uid
    const text = "INSERT INTO users(name, email) VALUES($1, $2) RETURNING *";
    const values = [uid, userName, password, carType, displayName, friends, numDrives, profilePhotoURL];
    client
      .query(text, values)
      .then((res) => {
        console.log(res.rows[0]);
      })
      .catch((e) => console.error(e.stack));
}