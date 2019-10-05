const mongoose = require('mongoose');

const schema = mongoose.Schema({
    comentario: {
        type: String,
        required: true
    },
    id_user: {
        type: mongoose.ObjectId,
        ref: 'User',
        required: true
    },
    id_receita: {
        type: mongoose.ObjectId,
        ref: 'Receita',
        required: true
    }
});

module.exports = mongoose.model('Comentario', schema, 'comentarios');