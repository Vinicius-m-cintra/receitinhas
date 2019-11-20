const mongoose = require('mongoose');

const schema = mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    tempo_de_preparo: {
        type: Number, //quantidade de tempo em minutos
        required: true
    },
    ingredientes: [{
        type: mongoose.ObjectId,
        ref: 'Ingrediente',
        required: true
    }],
    modo_de_preparo: {
        type: String,
        required: true
    },
    id_user: {
        type: mongoose.ObjectId,
        ref: 'User',
        required: true
    },
    likes: {
        type: Number
    },
    dislikes: {
        type: Number
    }
});

module.exports = mongoose.model('Receita', schema, 'receitas');