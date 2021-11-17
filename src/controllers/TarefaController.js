const Tarefa = require('../models/Tarefa');

function TarefaController(app) {
  app.get('/api/tarefas', async (_, res) => {
    try {
      const resultado = await Tarefa.listaTarefas();
      res.json(resultado);
    } catch (err) {
      res.json(err);
    }
  });
  
  app.get('/api/tarefa/:id', (_, res) => {
    res.send('Rota em construção 🚧');
  });

  app.post('/api/tarefa', (_, res) => {
    res.send('Rota em construção 🚧');
  });
}

module.exports = TarefaController;
