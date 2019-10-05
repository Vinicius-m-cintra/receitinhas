const mongoose = require('mongoose');

const schema = mongoose.Schema({
    id_user: {
        type: mongoose.ObjectId, 
        ref: 'User',
        required: true
    },
    email: {
        type: String,
        required: true
    },
    senha: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Login', schema, 'logins');