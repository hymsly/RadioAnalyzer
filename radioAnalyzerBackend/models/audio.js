'use strict'

module.exports = function (db, cb) {
    global.db.define("audio", {
        id: {
            type: 'number',
            required: 'true',
        },
        name: {
            type: 'text',
            required: 'true',
        },
        location: {
            type: 'text',
            required: 'true'
        },
        estado: {
            type: 'text',
        },
        created_at: {
            type: 'date',
        },
        duracion: {
            type: 'number'
        }
    },
        {
            cache: false
        });
    return cb();
};