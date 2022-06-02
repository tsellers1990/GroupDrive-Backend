const {client} = require("../middleware/postgresClient")
/*
This is where the operators for creating, updating and canceling drives will be the functions to be implemented are outlined
Create - This will create a drive, it will take in the orginizerUID, geoJSON ID in mongo, date its occuring, driver limits, and if its a reoccuring meet
Update - will take the same options as create, but they will be optional and will update them in place on the database
Cancel - This will update the drive to canceled
Happened - this will update the drive to it being past tense

Of note, none of the drives will be removed to retain historical records of drives that have happened
 */