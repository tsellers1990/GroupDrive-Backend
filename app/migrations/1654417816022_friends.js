/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {pgm.createTable('friends', {
    uidA: {
        allowNull: false,
        type: 'integer',
    },
    uidB: {
        allowNull: false,
        type: 'integer'
    },
    relationship:{
        allowNull: false,
        type: 'varchar(10)'
    },
    createdAt: {
        type: 'timestamp',
        notNull: true,
        default: pgm.func('current_timestamp'),
    },
})};
exports.down = pgm => {};
