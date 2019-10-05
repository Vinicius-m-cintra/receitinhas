const mongoose = require('mongoose');

const schema = mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    sobrenome: {
        type: String,
        required: true
    },
    bio: {
        type: String,
    }
});

module.exports = mongoose.model('User', schema, 'users');