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

  app.get('/api/tarefas/:idUsuario', async (req, res) => {
    const id = parseInt(req.params.idUsuario);

    try {
      const tarefas = await tarefaObj.listaTarefasUsuario(id);

      res.json({
        erro: false,
        tarefas: tarefas,
      });
    } catch (err) {
      res.json({
        erro: true,
        msg: err,
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

  app.patch('/api/tarefa/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const body = { ...req.body };

    try {
      const info = await tarefaObj.atualizaTarefa(id, body);

      res.json({
        erro: false,
        info: info,
      });
    } catch (err) {
      res.json({
        erro: true,
        msg: err,
      });
    }
  });

  app.delete('/api/tarefa/:id', async (req, res) => {
    const id = parseInt(req.params.id);

    try {
      const info = await tarefaObj.deletaTarefa(id);

      res.json({
        erro: false,
        info: info,
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
