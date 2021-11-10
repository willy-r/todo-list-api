const express = require('express');

const app = express();
const PORT = 3000;

app.get('/usuario', (_, res) => {
  res.send(`Rota ativada com GET e recurso "usuario": valores de "usuario" devem ser retornados`);
});

app.get('/tarefa', (_, res) => {
  res.send(`Rota ativada com GET e recurso "tarefa": valores de "tarefa" devem ser retornados`);
});

app.listen(PORT, () => console.log(`Ouvindo na porta ${PORT}`));
