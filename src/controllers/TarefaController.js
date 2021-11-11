function TarefaController(app) {
  app.get('/tarefas', (_, res) => {
    res.send(`Rota ativada com GET e recurso "tarefa": valores de "tarefa" devem ser retornados`);
  });

  app.post('/tarefas/criar', (_, res) => {
    res.send('Rota POST de "tarefa" ativada: tarefa adicionada ao banco de dados');
  });
}

module.exports = TarefaController;
