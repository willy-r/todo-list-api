const express = require('express');
const consign = require('consign');
const cors = require('cors');

function configuraExpress() {
  const app = express();
  
  // Middlewares.
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Rotas.
  consign().include('./src/controllers').into(app);

  return app;
}

module.exports = configuraExpress;
