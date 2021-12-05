const md5 = require('md5');
class Usuario {
  constructor(db) {
    this._db = db;
  }

  listaUsuarios() {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM usuario;';
      
      this._db.all(query, (err, linhas) => {
        if (err) {
          reject('Erro ao consultar o banco de dados');
          return;
        }

        resolve(linhas);
      });
    });
  }

  buscaUsuario(id) {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT * FROM usuario
        WHERE id_usuario = ?;
      `;

      this._db.get(query, id, (err, linha) => {
        if (err) {
          reject('Erro ao consultar o banco de dados');
          return;
        }

        if (!linha) {
          reject(`Usuário com ID ${id} não encontrado`);
          return;
        }
        
        resolve(linha);
      });
    });
  }

  addUsuario(dadosUsuario) {
    return new Promise((resolve, reject) => {
      // Verifica os dados passados na requisição.
      this._verificaDadosParaAddUsuario(dadosUsuario, reject);
      
      const query = `
        INSERT INTO usuario (nome, email, senha)
        VALUES
          (?, ?, ?)
        ;
      `;
      const params = [
        dadosUsuario.nome,
        dadosUsuario.email,
        md5(dadosUsuario.senha),
      ];

      this._db.run(query, params, function(err) {
        if (err) {
          reject(err.code === 'SQLITE_CONSTRAINT'
                 ? 'Email já está cadastrado'
                 : 'Erro ao adicionar usuário no banco de dados');
          return;
        }

        resolve({ idUsuario: this.lastID });
      });
    });
  }

  /**
   * Verifica os dados de usuario antes de inserir no banco de dados:
   *   1. Os campos nome, email e senha são obrigatórios
   *   2. O nome não pode ter mais que 100 caracteres
   *   3. O email não pode ter mais que 100 caracteres
   *   4. A senha não pode ter mais que 255 caracteres
   */
  _verificaDadosParaAddUsuario(dadosUsuario, reject) {
    const erros = [];
    
    if (!dadosUsuario.nome || dadosUsuario.nome.length > 100) {
      erros.push('O nome é obrigatório e precisa ter no máximo 100 caracteres');
    }

    if (!dadosUsuario.email || dadosUsuario.email.length > 100) {
      erros.push('O email é obrigatório e precisa ter no máximo 100 caracteres');
    }

    if (!dadosUsuario.senha || !dadosUsuario.senha.length > 255) {
      erros.push('A senha é obrigatória e precisa ter no máximo 255 caracteres');
    }
    
    if (erros.length) {
      reject(erros.join('/'));
      return;
    }
  }

  logaUsuario(dadosUsuario) {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT * FROM usuario
        WHERE email = ?;
      `;

      this._db.get(query, dadosUsuario.email, (err, linha) => {
        if (err) {
          reject('Erro ao consultar banco de dados, tente novamente');
          return;
        }
        
        // Verifica se as senhas são iguais.
        const senhaCadastrada = linha ? linha.senha : null;
        const senhaInserida = md5(dadosUsuario.senha);

        if (senhaCadastrada !== senhaInserida || !linha) {
          reject('Email ou senha incorretos, tente novamente');
          return;
        }

        resolve({ idUsuario: linha.id_usuario });
      });
    });
  }

  atualizaUsuario(id, dadosUsuario) {
    return new Promise((resolve, reject) => {
      // Verifica os dados passados na requisição.
      this._verificaDadosParaAtualizarUsuario(dadosUsuario, reject);

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
        dadosUsuario.nome,
        dadosUsuario.email,
        dadosUsuario.senha ? md5(dadosUsuario.senha) : null,
        id,
      ];
      
      this._db.run(query, params, function(err) {
        if (err) {
          reject('Erro ao atualizar informações do usuário no banco de dados');
          return;
        }
        
        resolve({
          atualizou: this.changes,
          idUsuario: id,
        });
      });
    });
  }

  /**
   * Verifica os dados antes de atualizar usuario:
   *   1. Nenhum dos dados é obrigatório, pode ser que não venha algum campo
   *   2. O nome precisa ter no máximo 100 caracteres
   *   3. O email precisa ter no máximo 100 caracteres
   *   4. A senha precisa ter no máximo 255 caracteres
   */
  _verificaDadosParaAtualizarUsuario(dadosUsuario, reject) {
    const erros = [];

    if (dadosUsuario.nome && dadosUsuario.nome.length > 100) {
      erros.push('O nome precisa ter no máximo 100 caracteres');
    }

    if (dadosUsuario.email && dadosUsuario.email.length > 100) {
      erros.push('O email precisa ter no máximo 100 caracteres');
    }

    if (dadosUsuario.senha && dadosUsuario.senha.length > 255) {
      erros.push('O senha precisa ter no máximo 255 caracteres');
    }

    if (erros.length) {
      reject(erros.join('/'));
      return;
    }
  }

  deletaUsuario(id) {
    return new Promise((resolve, reject) => {
      const query = `
        DELETE FROM usuario
        WHERE id_usuario = ?;
      `;

      this._db.run(query, id, function(err) {
        if (err) {
          reject('Erro ao deletar usuário no banco de dados');
          return;
        }

        resolve({
          deletou: this.changes,
          idUsuario: id,
        });
      });
    });
  }
}

module.exports = Usuario;
