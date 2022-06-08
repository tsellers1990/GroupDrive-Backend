/* eslint-disable camelcase */

exports.shorthands = undefined;
// create table users
// (
//     uid           varchar not null,
//     "userName"    varchar not null,
//     password      varchar not null,
//     "carType"     varchar,
//     "displayName" varchar not null,
//     friends       character varying[],
//     "numDrives"   integer default 0,
//     "profileURL"  varchar
// );
exports.up = pgm => {pgm.createTable('users', {
    uid: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: 'integer',
    },
    userName: { type: 'varchar(500)',
        notNull: true,
        unique: true,
    },
    password: {
        type: 'varchar(10000)',
        notNull: true
    },
    carType: {
        type: 'varchar(1000)',
        notNull: true,
        defaultValue: 'MayBike',
    },
    displayName: {
        type: 'varchar(50)',
        notNull: true,
    },
    numDrives: {
        type: "integer",
        notNull: true,
        defaultValue: 0,
    },
    profileURL: {
        type: "varchar(255)",
        notNull: true,
        defaultValue: "https://res.cloudinary.com/selrich-technology/image/upload/v1653431979/ymztltnx1lgsynhqknw2.png"
    },
    lastSignIn:{
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
    createdAt: {
        type: 'timestamp',
        notNull: true,
        default: pgm.func('current_timestamp'),
    },
})};

exports.down = pgm => {};
