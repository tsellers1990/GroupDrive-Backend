/* eslint-disable camelcase */

exports.shorthands = undefined;
//Create - This will create a drive, it will take in the orginizerUID, geoJSON ID in mongo, date its occuring, driver limits, and if its a reoccuring meet, topicID of GroupChat
exports.up = pgm => {pgm.createTable('drives', {
    driveId: {
        allowNull: true,
        autoIncrement: true,
        primaryKey: true,
        type: 'integer',
        defaultValue: 0
    },
    orginizerUID:{
        allowNull: false,
        type: 'integer'
    },
    geoMongoId:{
        allowNull:false,
        type: 'integer'
    },
    dateOccuring:{
        allowNull:false,
        type: 'integer',
    },
    driverLimit:{
        allowNull:false,
        type: 'integer',
        defaultValue: 20
    },
    reoccuring:{
        allowNull:false,
        type: 'integer',
        defaultValue: 0
    },
    createdAt: {
        type: 'integer',
        // notNull: true,
        defaultValue: new Date()
    },
})};

exports.down = pgm => {};
