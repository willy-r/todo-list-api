const db = require('../infra/dbConexao');

class Usuario {
  constructor(db) {
    this._db = db;
  }

  listaUsuarios() {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM usuario;';
      
      this._db.all(query, (err, linhas) => {
        if (err) {
          reject({
            msg: 'Erro ao consultar o banco de dados',
            motivo: err.message,
          });
          return;
        }

        resolve(linhas);
      });
    });
  }

  buscaUsuarioPorID(id) {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT * FROM usuario
        WHERE id_usuario = ? AND ativo = TRUE;
      `;

      this._db.get(query, id, (err, linha) => {
        if (err) {
          reject({
            msg: 'Erro ao consultar o banco de dados',
            motivo: err.message,
          });
          return;
        }
        if (!linha) {
          reject({
            msg: 'Usuário não existe no banco de dados',
            id_usuario: id,
          })
          return;
        }
        
        resolve(linha);
      });
    });
  }

  addUsuario(novoUsuario) {
    return new Promise((resolve, reject) => {
      // Trata os erros relacionados aos parâmetros da requisição.
      this._trataErros(novoUsuario, reject);
      
      // Adiciona o usuário no banco de dados.
      const query = `
        INSERT INTO usuario (nome, email, senha, ativo)
        VALUES
          (?, ?, ?, ?)
        ;
      `;
      const arrUsuario = [
        novoUsuario.nome,
        novoUsuario.email,
        novoUsuario.senha,
        1, // Por padrão o usuário já vai ser tratato como um usuário ativo.
      ];

      this._db.run(query, arrUsuario, function(err) {
        if (err) {
          reject({
            msg: 'Erro ao adicionar usuário no banco de dados',
            motivo: err.code === 'SQLITE_CONSTRAINT' ? 'Email já cadastrado' : err.message,
          });
          return;
        }

        resolve({
          msg: 'Usuário registrado com sucesso',
          dados: novoUsuario,
          id_usuario: this.lastID,
        });
      });
    });
  }

  _trataErros(novoUsuario, reject) {
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
        msg: 'Erro ao registrar usuário',
        erros: erros,
      });
      return;
    }
  }
}

module.exports = new Usuario(db);
