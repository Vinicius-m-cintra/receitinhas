const Receita = require('../models/Receita');

const controller = {}; // Objeto vazio

controller.novo = async function (req, res) {
   try {
      await Receita.create(req.body);
      // HTTP 201: Created
      res.sendStatus(201).end();
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
      const receitas = await Receita.find().populate('ingredientes').populate('id_user')
      res.send(receitas);
   }
   catch (erro) {
      console.error(erro);
      res.sendStatus(500).end();
   }
}

controller.obterUm = async function (req, res) {
   const id = req.params.id;
   try {
      const receita = await Receita.findById(id);
      if (receita) {    // Receita encontrada (variável preenchida)
         res.send(receita);
      }
      else {      // Receita não encontrada (variável vazia)
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
      const receita = await Receita.findByIdAndUpdate(id, req.body);
      if (receita) {
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
      const receita = await Receita.findByIdAndDelete(id);
      if (receita) {
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