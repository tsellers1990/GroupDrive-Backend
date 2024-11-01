/* eslint-disable camelcase */

exports.shorthands = undefined;
//Create - This will create a drive, it will take in the orginizerUID, geoJSON ID in mongo, date its occuring, driver limits, and if its a reoccuring meet, topicID of GroupChat
exports.up = (pgm) => {
  pgm.createTable("events", {
    driveId: {
      allowNull: true,
      autoIncrement: true,
      primaryKey: true,
      type: "integer",
      defaultValue: 0,
    },
    orginizerUID: {
      allowNull: false,
      type: "integer",
    },
    geoMongoId: {
      allowNull: false,
      type: "varchar(255)",
    },
    dateOccuring: {
      allowNull: false,
      type: "bigint",
    },
    driverLimit: {
      // allowNull:false,
      type: "integer",
      defaultValue: 20,
    },
    reoccuring: {
      // allowNull:false,
      type: "integer",
      defaultValue: 0,
    },
    createdAt: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
    driveMembers: {
      type: "text[]",
    //   default: [],
    },
    driveTitle: {
      allowNull: false,
      type: "varchar(255)",
    },
    destination: {
      allowNull: false,
      type: "varchar(255)",
    },
    date: {
      allowNull: false,
      type: "varchar(255)",
    },
    time: {
      allowNull: false,
      type: "varchar(255)",
    },
  });
};

exports.down = (pgm) => {};
