const dayjs = require('dayjs');

class Tarefa {
  constructor(db) {
    this._db = db;
  }

  listaTarefas() {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM tarefa;';

      this._db.all(query, (err, linhas) => {
        if (err) {
          reject('Erro ao consultar o banco de dados');
          return;
        }

        resolve(linhas);
      });
    });
  }

  listaTarefasUsuario(id) {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT * FROM tarefa
        WHERE id_usuario = ?;
      `;

      this._db.all(query, id, (err, linhas) => {
        if (err) {
          reject('Erro ao consultar banco de dados');
          return;
        }

        resolve(linhas);
      });
    });
  }

  buscaTarefa(id) {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT * FROM tarefa
        WHERE id_tarefa = ?;
      `;

      this._db.get(query, id, (err, linha) => {
        if (err) {
          reject('Erro ao consultar o banco de dados');
          return;
        }

        if (!linha) {
          reject(`Tarefa com ID ${id} não encontrada`);
          return;
        }

        resolve(linha);
      });
    });
  }

  addTarefa(dadosTarefa) {
    return new Promise((resolve, reject) => {
      // Verifica os dados passados na requisição.
      this._verificaDadosParaAddTarefa(dadosTarefa, reject);

      const query = `
        INSERT INTO tarefa (titulo, descricao, data_criacao, status, id_usuario)
        VALUES
          (?, ?, ?, ?, ?)
        ;
      `;

      const params = [
        dadosTarefa.titulo,
        dadosTarefa.descricao,
        dayjs().format('YYYY-MM-DD HH:mm:ss'),
        dadosTarefa.status,
        dadosTarefa.id_usuario,
      ];

      this._db.run(query, params, (err) => {
        if (err) {
          reject('Erro ao adicionar tarefa no banco de dados');
          return;
        }

        resolve(dadosTarefa);
      });
    });
  }

  /**
   * Trata os dados de tarefa antes de inserir no banco de dados:
   *   1. Os campos titulo, status e id_usuario são obrigatórios
   *   2. O título não pode ter mais que 255 caracteres
   *   3. O status precisa ser um dos três: 0 para fazendo, 1 para feito, 2 para a fazer
   *   4. O id_usuario precisa existir na tabela usuario
   */
  _verificaDadosParaAddTarefa(dadosTarefa, reject) {
    const erros = [];

    if (!dadosTarefa.titulo || dadosTarefa.titulo.length > 255) {
      erros.push('O título é obrigatório e precisa ter no máximo 255 caracteres');
    }

    if (typeof dadosTarefa.status === 'undefined') {
      erros.push('O status é obrigatório');
    } else {
      // 0 = fazendo, 1 = feito, 2 = a fazer
      const statusValidos = [0, 1, 2];

      if (!statusValidos.includes(dadosTarefa.status)) {
        erros.push('O status precisa ser igual a: 0, 1 ou 2, consulte a documentação');
      }
    }

    if (!dadosTarefa.id_usuario) {
      erros.push('O ID do usuário é obrigatório');
    } else {
      const query = `
        SELECT * FROM usuario
        WHERE id_usuario = ?;
      `;

      this._db.get(query, dadosTarefa.id_usuario, (_, linha) => {
        // Usuário não existe no banco de dados.
        if (!linha) {
          reject(`Usuário com ID ${dadosTarefa.id_usuario} não existe`);
          return;
        }
      });
    }

    if (erros.length) {
      reject(erros.join('/'));
    }
  }

  atualizaTarefa(id, dadosTarefa) {
    return new Promise((resolve, reject) => {
      // Verifica os dados passados na requisição.
      this._verificaDadosParaAtualizarTarefa(dadosTarefa, reject);

      // Como não se sabe quais dados estão sendo atualizados,
      // é usada a função COALESCE() para pegar o primeiro valor não nulo.
      const query = `
        UPDATE tarefa
        SET
          titulo = COALESCE(?, titulo),
          descricao = COALESCE(?, descricao),
          status = COALESCE(?, status)
        WHERE id_tarefa = ?;
      `;
      const params = [
        dadosTarefa.titulo,
        dadosTarefa.descricao,
        dadosTarefa.status,
        id,
      ];

      this._db.run(query, params, function(err) {
        if (err) {
          reject('Erro ao atualizar informações de tarefa no banco de dados');
          return;
        }

        resolve({
          atualizou: this.changes,
          idTarefa: id,
        });
      });
    });
  }

  /**
   * Verifica os dados antes de atualizar tarefa:
   *   1. Nenhum dos dados é obrigatório, pode ser que não venha algum campo
   *   2. O titulo precisa ter no máximo 255 caracteres
   *   3. O status precisa ser: 0 para fazendo, 1 feito ou 2 a fazer
   */
  _verificaDadosParaAtualizarTarefa(dadosTarefa, reject) {
    const erros = [];

    if (dadosTarefa.titulo && dadosTarefa.titulo > 255) {
      erros.push('O titulo precisa ter no máximo 255 caracteres');
    }

    // 0 = fazendo, 1 = feito, 2 = a fazer
    const statusValidos = [0, 1, 2];

    if (typeof dadosTarefa.status !== 'undefined' && !statusValidos.includes(dadosTarefa.status)) {
      erros.push('O status precisa ser igual a: 0, 1 ou 2, consulte a documentação');
    }

    if (erros.length) {
      reject(erros.join('/'));
      return;
    }
  }

  deletaTarefa(id) {
    return new Promise((resolve, reject) => {
      const query = `
        DELETE FROM tarefa
        WHERE id_tarefa = ?;
      `;

      this._db.run(query, id, function(err) {
        if (err) {
          reject('Erro ao deletar tarefa no banco de dados');
          return;
        }

        resolve({
          deletou: this.changes,
          idTarefa: id,
        });
      });
    });
  }
}

module.exports = Tarefa;
