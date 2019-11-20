const Ingrediente = require('../models/Ingrediente');

const controller = {}; // Objeto vazio

controller.novo = async function (req, res) {
   try {
      await Ingrediente.create(req.body);
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
      const ingredientes = await Ingrediente.find()
      res.send(ingredientes);
   }
   catch (erro) {
      console.error(erro);
      res.sendStatus(500).end();
   }
}

controller.obterUm = async function (req, res) {
   const id = req.params.id;
   try {
      const ingrediente = await Ingrediente.findById(id);
      if (ingrediente) {    // Ingredientes encontrada (variável preenchida)
         res.send(ingrediente);
      }
      else {      // Ingredientes não encontrada (variável vazia)
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
      const ingrediente = await Ingrediente.findByIdAndUpdate(id, req.body);
      if (ingrediente) {
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
      const ingrediente = await Ingrediente.findByIdAndDelete(id);
      if (ingrediente) {
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