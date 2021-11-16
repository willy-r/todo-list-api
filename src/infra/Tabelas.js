class Tabelas {
  criaTabelas(db) {
    this._criaTabelaUsuario(db);
    this._criaTabelaTarefa(db);
  }

  _criaTabelaUsuario(db) {
    const query = `
      CREATE TABLE IF NOT EXISTS usuario (
        id_usuario INTEGER PRIMARY KEY AUTOINCREMENT,
        nome VARCHAR(100),
        email VARCHAR(100) UNIQUE,
        senha VARCHAR(255)
      );
    `;

    db.run(query, (err) => {
      if (err) {
        console.log('Erro na criação da tabela "usuario":', err.message);
        return;
      }

      console.log('Tabela "usuario" criada (ou já existe) com sucesso!');
    });
  }

  _criaTabelaTarefa(db) {
    const query = `
      CREATE TABLE IF NOT EXISTS tarefa (
        id_tarefa INTEGER PRIMARY KEY AUTOINCREMENT,
        titulo VARCHAR(255),
        conteudo TEXT,
        data_criacao DATETIME,
        data_conclusao DATETIME,
        status TINYINT(2),
        id_usuario INTEGER,
        FOREIGN KEY (id_usuario) REFERENCES usuario (id_usuario)
      );
    `;

    db.run(query, (err) => {
      if (err) {
        console.log('Erro na criação da tabela "tarefa":', err.message);
        return;
      }

      console.log('Tabela "tarefa" criada (ou já existe) com sucesso!');
    });
  }
}

module.exports = new Tabelas;
