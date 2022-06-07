/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {pgm.createTable('chatTopics', {
    chatUid: {
        allowNull: false,
        type: 'integer',
    },
    participantId: {
        allowNull: false,
        type: 'integer'
    },
    type:{
        allowNull: false,
        type: varchar(10)
    },
    createdAt: {
        type: 'timestamp',
        notNull: true,
        default: pgm.func('current_timestamp'),
    },
})};

exports.down = pgm => {};
