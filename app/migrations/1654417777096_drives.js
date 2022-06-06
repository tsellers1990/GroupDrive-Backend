/* eslint-disable camelcase */

exports.shorthands = undefined;
//Create - This will create a drive, it will take in the orginizerUID, geoJSON ID in mongo, date its occuring, driver limits, and if its a reoccuring meet, topicID of GroupChat
exports.up = pgm => {pgm.createTable('users', {
    driveId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: 'integer',
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
        type: 'time'
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
        type: 'timestamp',
        notNull: true,
        default: pgm.func('current_timestamp'),
    },
})};

exports.down = pgm => {};
