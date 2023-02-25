const { client } = require("../middleware/postgresClient");
/*
 Same concept as the friends table, we will associate topicIDs with userUIDs, there will be flags for group chats and direct messages
 createGC - this function should be called in an iterated form, it check if the gcID exists, if it does not, then it will create a gcID
    using kafka and subsribe the first uid given, as a return it will provide the gcID
 removeGC - this function will be called, if there is more than two users in the chat, it will drop the user from the topic association, if
    there are two users total, and this function is called, it will remove all remaining users from the topic and close the groupChat
 createDM - will take two uids, and will create a dmID association record, this record will only allow two total participants
 destroyDM - will take two uids, and will remove the associated UIDs and remove the topic
  */
