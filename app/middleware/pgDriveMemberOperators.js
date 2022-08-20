const {client} = require("../middleware/postgresClient")
/*
This is where associating users to drives will take place, drives will not be stored here, it will operate similarly to the friends table
Add - will take two UIDs, the first being the driveUID and the second being the userUID and create an entry subscribing the user to the drive
Interested - will take two UIDs, the first being the driveUID and the second being the userUID and create an entry markign the user as interested in the drive
Remove - will take two UIDs, the first being the driveUID and the second being the userUID, this will remove the entry for the user being in/interested for the drive
*/

const addDrivemember = async () => {
    console.log("addDrivemember function called")

    

    return true
}

module.exports = {addDrivemember}