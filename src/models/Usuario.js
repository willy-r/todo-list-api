const db = require('../infra/dbConexao');

class Usuario {
  constructor(db) {
    this._db = db;
  }

  addUsuario(novoUsuario) {
    return new Promise((resolve, reject) => {
      const erros = [];
    
      if (!novoUsuario.nome) {
        erros.push({
          param: 'nome',
          msg: 'O parâmetro nome é obrigatório',
        });
      }
      if (!novoUsuario.email) {
        erros.push({
          param: 'email',
          msg: 'O parâmetro email é obrigatório',
        });
      }
      if (!novoUsuario.senha) {
        erros.push({
          param: 'senha',
          msg: 'O parâmetro senha é obrigatório',
        });
      }

      if (erros.length) {
        reject({
          msg: 'Erro ao criar usuário',
          erros: erros,
        });
        return;
      }

      // Adiciona o usuário no banco de dados.
      const query = `
        INSERT INTO usuario (nome, email, senha)
        VALUES
          (?, ?, ?)
        ;
      `;
      const arrUsuario = [novoUsuario.nome, novoUsuario.email, novoUsuario.senha];

      this._db.run(query, arrUsuario, function(err) {
        if (err) {
          reject({
            msg: 'Erro ao adicionar usuário no banco de dados',
            motivo: err.message,
          });
          return;
        }

        resolve({
          msg: "Usuário criado com sucesso",
          dados: novoUsuario,
          id_usuario: this.lastID,
        });
      });
    });
  }
}

module.exports = new Usuario(db);
