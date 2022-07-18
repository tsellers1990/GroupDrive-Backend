/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable("driveRoutes", {
    routeId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: "integer",
    },
    routeName: {
      allowNull: false,
      type: "varchar(100)",
    },
    tags: {
      allowNull: true,
      type: "varchar(500)",
    },
    geoMongoId: {
      allowNull: false,
      type: "varchar(255)",
    },
    createdAt: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
  });
};

exports.down = (pgm) => {};
