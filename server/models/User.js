const mongoose = require('mongoose');

const user = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        unique: true,
        type: String,
        required: true
    },
    picture: {
        type: String,
        required: true
    },
    access_token: {
        type: String,
    },
    refresh_token: {
        type: String,
    },
    scope: {
        type: String,
    },
    token_type: {
        type: String,
    },
    expiry_date: {
        type: Number,
    }
});

module.exports = mongoose.model('User', user);

