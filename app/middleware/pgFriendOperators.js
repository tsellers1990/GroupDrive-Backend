const {client} = require("../middleware/postgresClient")
/*
This is an intial stab at creating a friends structure, there will be  dedicated operators for
Add - This takes in two UIDs and will create an intial relationship entry and set the status to pending as the other party will have not yet accepted the friend request
Accepted - This will take two UIDs, this will update the relationship to accepted
Rejected - This will take two UIDs, this will update the relationship to rejected by deleting the row
Block - This will take two UIDs, this will update the relationship to blocked and will not delete the entry
Unblock - This will take two UIDs, this will update the relationship to rejected by deleting the row
Remove - This will take two UIDs, it will then remove the entry from the database
*/

const getFriends = async (uid) =>{
    const text = `SELECT * FROM public.friends WHERE ("uidA") = $1`;
    const values = [uid];
    console.log(uid)
    const response = await client
    .query(text, values)
    .then((res) => {
    //   console.log(res.rows[0]);
      return res.rows;
    })
    .catch((e) => {
      console.error(e.stack);
      return { err: e };
    });

  if (!response.err) {
    return { response };
  } else {
    return { response };
  }


};
const addFriend = async (uidA, uidB, relationship) => {
    /*
 @name: addFriend
 @params: uidIntiator, uidRecipient
 @desc: will create a friend entry in the relationships table, and will set it to pending
 @return:
 */

  const text = `INSERT INTO public.friends("uidA", "uidB", relationship) VALUES ($1,$2, $3) RETURNING *`;
  const values = [uidA, uidB, relationship];

  const response = await client
    .query(text, values)
    .then((res) => {
      console.log(res.rows[0]);
      return true;
    })
    .catch((e) => {
      console.error(e.stack);
      return e;
    });

  if (!response.err) {
    return { response };
  } else {
    return { response };
  }


};

/*
@name: acceptFriend
@params: uidIntiator, uidRecipient
@desc: will create a friend entry in the relationships table, and will set it to pending
@return:
*/
const acceptFriend = (uidA, uidB) => {
    
};

/*
@name: rejectFriend
@params: uidIntiator, uidRecipient
@desc: will create a friend entry in the relationships table, and will set it to pending
@return:
*/
const rejectFriend = (uidA, uidB) => {
    
};

/*
@name: blockUser
@params: uidIntiator, uidRecipient
@desc: will create a friend entry in the relationships table, and will set it to pending
@return:
*/
const blockUser = (uidA, uidB) => {
    
};

/*
@name: unblockFriend
@params: uidIntiator, uidRecipient
@desc: will create a friend entry in the relationships table, and will set it to pending
@return:
*/
const unblockFriend = (uidA, uidB) => {
    
};

/*
@name: removeFriend
@params: uidIntiator, uidRecipient
@desc: will create a friend entry in the relationships table, and will set it to pending
@return:
*/
const removeFriend = (uidA, uidB) => {
    
};

module.exports={getFriends, addFriend, acceptFriend, rejectFriend, blockUser, unblockFriend, removeFriend};