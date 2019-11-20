const Comentario = require('../models/Comentario');

const controller = {}; // Objeto vazio

controller.novo = async function (req, res) {
   try {
      await Comentario.create(req.body);
      // HTTP 201: Created
      res.status(201).send('');
   }
   catch (erro) {
      console.error(erro);
      // HTTP 500: Internal server error
      res.sendStatus(500).end();
   }
}

controller.listar = async function (req, res) {
   try {
      // find() sempre retorna um VETOR,
      // mesmo que vazio
      const comentarios = await Comentario.find().populate('id_user').populate('id_receita')
      res.send(comentarios);
   }
   catch (erro) {
      console.error(erro);
      res.sendStatus(500).end();
   }
}

controller.obterUm = async function (req, res) {
   const id = req.params.id;
   try {
      const comentario = await Comentario.findById(id);
      if (comentario) {    // Comentario encontrada (variável preenchida)
         res.send(comentario);
      }
      else {      // Comentario não encontrada (variável vazia)
         // HTTP 404: Not found
         res.sendStatus(404).end();
      }
   }
   catch (erro) {
      console.error(erro);
      res.sendStatus(500).end();
   }
}

controller.atualizar = async function (req, res) {
   const id = req.body._id;
   try {
      const comentario = await Comentario.findByIdAndUpdate(id, req.body);
      if (comentario) {
         // HTTP 204: No content
         res.sendStatus(204).end();
      }
      else {
         res.sendStatus(404).end();
      }
   }
   catch (erro) {
      console.error(erro);
      res.sendStatus(500).end();
   }
}

controller.excluir = async function (req, res) {
   const id = req.body._id;
   try {
      const comentario = await Comentario.findByIdAndDelete(id);
      if (comentario) {
         res.sendStatus(204).end();
      }
      else {
         res.sendStatus(404).end();
      }
   }
   catch (erro) {
      console.error(erro);
      res.sendStatus(500).end();
   }
}

module.exports = controller;