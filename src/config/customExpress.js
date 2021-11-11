const express = require('express');
const consign = require('consign');

function configuraExpress() {
  const app = express();
  
  // Rotas.
  consign().include('./src/controllers').into(app);

  return app;
}

module.exports = configuraExpress;
