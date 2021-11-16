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

        resolve({ resultados: linhas });
      });
    });
  }

  buscaUsuario(id) {
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
        
        resolve({ resultados: linha });
      });
    });
  }

  addUsuario(dadosUsuario) {
    return new Promise((resolve, reject) => {
      // Trata os erros relacionados aos parâmetros da requisição.
      this._trataErros(dadosUsuario, reject);
      
      // Adiciona o usuário no banco de dados.
      const query = `
        INSERT INTO usuario (nome, email, senha, ativo)
        VALUES
          (?, ?, ?, ?)
        ;
      `;
      const params = [
        dadosUsuario.nome,
        dadosUsuario.email,
        dadosUsuario.senha,
        1, // Por padrão o usuário já vai ser tratato como um usuário ativo.
      ];

      this._db.run(query, params, function(err) {
        if (err) {
          reject({
            msg: 'Erro ao adicionar usuário no banco de dados',
            motivo: err.code === 'SQLITE_CONSTRAINT' ? 'Email já cadastrado' : err.message,
          });
          return;
        }

        resolve({
          msg: 'Usuário registrado com sucesso',
          dados: dadosUsuario,
          id_usuario: this.lastID,
        });
      });
    });
  }

  _trataErros(dadosUsuario, reject) {
    const erros = [];
    
    if (!dadosUsuario.nome) {
      erros.push({
        param: 'nome',
        msg: 'O parâmetro nome é obrigatório',
      });
    }
    if (!dadosUsuario.email) {
      erros.push({
        param: 'email',
        msg: 'O parâmetro email é obrigatório',
      });
    }
    if (!dadosUsuario.senha) {
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

  atualizaUsuario(id, dadosUsuario) {
    return new Promise((resolve, reject) => {
      // Como não se sabe quais dados estão sendo atualizados,
      // é usada a função COALESCE() para pegar o primeiro valor não nulo.
      const query = `
        UPDATE usuario
        SET
          nome = COALESCE(?, nome),
          email = COALESCE(?, email),
          senha = COALESCE(?, senha)
        WHERE id_usuario = ?;
      `;
      const params = [
        dadosUsuario.email,
        dadosUsuario.nome,
        dadosUsuario.senha,
        id,
      ];
      
      this._db.run(query, params, function(err) {
        if (err) {
          reject({
            msg: 'Erro ao atualizar informações do usuário no banco de dados',
            motivo: err.message,
          });
          return;
        }
        if (!this.changes) {
          reject({
            msg: 'Usuário não existe no banco de dados',
            id_usuario: id,
          });
          return;
        }
        
        resolve({
          msg: 'Informações de usuário atualizadas',
          dados_atualizados: dadosUsuario,
          id_usuario: id,
        });
      });
    });
  }
}

module.exports = new Usuario(db);
