const express = require('express');
const consign = require('consign');

function configuraExpress() {
  const app = express();
  
  // Middlewares.
  app.use(express.json());

  // Rotas.
  consign().include('./src/controllers').into(app);

  return app;
}

module.exports = configuraExpress;
