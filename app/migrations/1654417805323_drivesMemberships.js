/* eslint-disable camelcase */

exports.shorthands = undefined;
//Add - will take two UIDs, the first being the driveUID and the second being the userUID and create an entry subscribing the user to the drive
exports.up = (pgm) => {
  pgm.createTable("driveMemberships", {
    driveId: {
      allowNull: false,
      type: "integer",
    },
    participantId: {
      allowNull: false,
      type: "integer",
    },
    state: {
      allowNull: false,
      type: "varchar(10)",
    },
    createdAt: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
  });
};

exports.down = (pgm) => {};
