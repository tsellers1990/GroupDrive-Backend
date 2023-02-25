/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable("chatTopics", {
    Uid: {
      allowNull: false,
      type: "varchar",
    },
    mqttUser: {
      allowNull: false,
      type: "varchar",
    },
    mqttPassword: {
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
