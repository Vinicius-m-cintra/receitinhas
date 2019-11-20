const Login = require('../models/Login');

const controller = {}; // Objeto vazio

controller.novo = async function (req, res) {
   try {
      await Login.create(req.body);
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
      const logins = await Login.find().populate('id_user');
      res.send(logins);
   }
   catch (erro) {
      console.error(erro);
      res.sendStatus(500).end();
   }
}

controller.obterUm = async function (req, res) {
   const id = req.params.id;
   try {
      const login = await Comentario.findById(id);
      if (login) {    // Login encontrada (variável preenchida)
         res.send(login);
      }
      else {      // Login não encontrada (variável vazia)
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
      const login = await Login.findByIdAndUpdate(id, req.body);
      if (login) {
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
      const login = await Login.findByIdAndDelete(id);
      if (login) {
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