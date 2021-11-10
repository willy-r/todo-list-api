const express = require('express');

const app = express();
const PORT = 3000;

app.get('/usuarios', (_, res) => {
  res.send(`Rota ativada com GET e recurso "usuarios": valores de "usuarios" devem ser retornados`);
});

app.get('/tarefas', (_, res) => {
  res.send(`Rota ativada com GET e recurso "tarefas": valores de "tarefas" devem ser retornados`);
});

app.listen(PORT, () => console.log(`Ouvindo na porta ${PORT}`));
