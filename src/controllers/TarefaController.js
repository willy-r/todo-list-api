function TarefaController(app) {
  app.get('/tarefas', (_, res) => {
    res.send(`Rota ativada com GET e recurso "tarefas": valores de "tarefas" devem ser retornados`);
  });  
}

module.exports = TarefaController;
