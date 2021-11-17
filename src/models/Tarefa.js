const db = require('../infra/dbConexao');

class Tarefa {
  constructor(db) {
    this._db = db;
  }

  listaTarefas() {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM tarefa;';

      this._db.all(query, (err, linhas) => {
        if (err) {
          reject({
            erro: true,
            msg: 'Erro ao consultar o banco de dados',
          });
          return;
        }

        resolve({
          erro: false,
          tarefas: linhas,
        });
      });
    });
  }
}

module.exports = new Tarefa(db);
