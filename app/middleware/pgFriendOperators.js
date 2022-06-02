const {client} = require("../middleware/postgresClient")
/*
This is an intial stab at creating a friends structure, there will be  dedicated operators for
Add - This takes in two UIDs and will create an intial relationship entry and set the status to pending as the other party will have not yet accepted the friend request
Accepted - This will take two UIDs, this will update the relationship to accepted
Rejected - This will take two UIDs, this will update the relationship to rejected by deleting the row
Block - This will take two UIDs, this will update the relationship to blocked and will not delete the entry
Unblock - This will take two UIDs, this will update the relationship back to accepted
Remove - This will take two UIDs, it will then remove the entry from the database
*/

/*
@name: addFriend
@params: uidIntiator, uidRecipient
@desc: will create a friend entry in the relationships table, and will set it to pending
@return:
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