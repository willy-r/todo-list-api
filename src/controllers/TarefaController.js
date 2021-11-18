const Tarefa = require('../models/Tarefa');

const TarefaController = (app, db) => {
  // Cria instância de Tarefa.
  const tarefaObj = new Tarefa(db);

  app.get('/api/tarefas', async (_, res) => {
    try {
      const tarefas = await tarefaObj.listaTarefas();
      
      res.json({
        erro: false,
        tarefas: tarefas,
      });
    } catch (err) {
      res.json({
        erro: true,
        msg: err.message,
      });
    }
  });
  
  app.get('/api/tarefa/:id', async (req, res) => {
    const id = parseInt(req.params.id);

    try {
      const tarefa = await tarefaObj.buscaTarefa(id);

      res.json({
        erro: false,
        tarefa: tarefa,
      });
    } catch (err) {
      res.json({
        erro: true,
        msg: err,
      });
    }
  });

  app.post('/api/tarefa', async (req, res) => {
    const body = { ...req.body };

    try {
      const tarefaCriada = await tarefaObj.addTarefa(body);

      res.json({
        erro: false,
        tarefaCriada: tarefaCriada,
      });
    } catch (err) {
      res.json({
        erro: true,
        msg: err,
      });
    }
  });
}

module.exports = TarefaController;
