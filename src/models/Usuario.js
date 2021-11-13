const db = require('../infra/dbConexao');

class Usuario {
  constructor(db) {
    this._db = db;
  }

  addUsuario(infoNovoUsuario) {
    // const erros = [];
    
    // if (!infoNovoUsuario.nome) {
    //   erros.push({
    //     nomeParam: 'nome',
    //     msg: 'O parâmetro nome é obrigatório',
    //   });
    // }
    // if (!infoNovoUsuario.email) {
    //   erros.push({
    //     nomeParam: 'email',
    //     msg: 'O parâmetro email é obrigatório',
    //   });
    // }
    // if (!infoNovoUsuario.senha) {
    //   erros.push({
    //     nomeParam: 'senha',
    //     msg: 'O parâmetro senha é obrigatório',
    //   });
    // }

    // if (erros.length) {
    //   throw new Error({
    //     sucesso: false,
    //     erros: erros,
    //   });
    // }

    // Adiciona novo usuário no banco de dados.
    const query = `
      INSERT INTO usuario (nome, email, senha)
      VALUES
        (?, ?, ?)
      ;
    `;
    const arrNovoUsuario = [infoNovoUsuario.nome, infoNovoUsuario.email, infoNovoUsuario.senha];

    return new Promise((resolve, reject) => {
      this._db.run(query, arrNovoUsuario, function(err) {
        if (err) {
          reject({
            sucesso: false,
            msg: err.message,
          });
          return;
        }
  
        resolve({
          sucesso: true,
          dados: infoNovoUsuario,
          id: this.lastID,
        });
      });
    });
  }
}

module.exports = new Usuario(db);
