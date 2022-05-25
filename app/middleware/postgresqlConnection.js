const { Client } = require("pg");
const client = new Client({
    user: 'postgres ',
    host: 'postgres_database',
    database: 'group_drive',
    password: 'example',
    port: 5432,
})
client.connect().then(()=>{
    console.log("postgres db connection is successfull");
}).catch((e)=>{
    console.log("no connection to postgres, did something go wrong? ");
});

/*
@name: createUser
@params: uid, userName, password, carType, displayName, carType, displayName, friends, numDrives, profilePhotoURL
@desc: Generates a prepared statement to inject values into the correct fields via postgresql
@return: true if user was successfully created
*/
const createUser = (uid, userName, password, carType, displayName, friends, numDrives, profilePhotoURL) => {
  // uid, name, pass, email,
  const text = "INSERT INTO public.users(uid, \"userName\", password, \"carType\", \"displayName\", friends, \"numDrives\", \"profileURL\") VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *";
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
        text = "SELECT * FROM public.users WHERE uid LIKE $1";
        values = [uid];
       
    } else if(!uid){
        text = "SELECT * FROM public.users WHERE \"userName\" LIKE $1"
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
    let text;
    let values;
    if(!displayName){
        text = "UPDATE public.users SET \"password\" = $2 WHERE uid LIKE $1 RETURNING *;";
        values = [uid, password];

    } else if(!password){
        text = "UPDATE public.users SET \"displayName\" = 'BARRFOOO' WHERE uid LIKE 'ABC123' RETURNING *;\n"
        values = [userName];
    } else if(!displayName && !password){
        text = "SELECT * FROM public.users WHERE \"userName\" LIKE $1"
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