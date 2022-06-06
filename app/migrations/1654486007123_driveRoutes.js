/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {pgm.createTable('users', {
    routeId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: 'integer',
    },
    routeName: {
        allowNull: false,
        type: 'varchar(100)'
    },
    tags:{
        allowNull: true,
        type: varchar(500)
    },
    mongoGeoID: {
        allowNull: false,
        type: integer
    },
    createdAt: {
        type: 'timestamp',
        notNull: true,
        default: pgm.func('current_timestamp'),
    },
})};

exports.down = pgm => {};
