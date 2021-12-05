const express = require('express');
const consign = require('consign');
const cors = require('cors');

const db = require('../infra/dbConexao');

const customExpress = () => {
  const app = express();
  const corsOptions = {
    origin: [/localhost/], // Adicionar aqui origens permitidas.
    methods: ['GET', 'PATCH', 'POST', 'DELETE'],
  };
  
  // Middlewares.
  app.use(cors(corsOptions));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Rotas.
  consign().include('./src/controllers').into(app, db);

  return app;
}

module.exports = customExpress;
