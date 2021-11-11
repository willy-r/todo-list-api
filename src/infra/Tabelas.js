class Tabelas {
  criaTabelas(db) {
    this._criaTabelaUsuario(db);
  }

  _criaTabelaUsuario(db) {
    const query = `
      CREATE TABLE IF NOT EXISTS usuario (
        id_usuario INTEGER PRIMARY KEY AUTOINCREMENT,
        nome VARCHAR(100),
        email VARCHAR(150) UNIQUE,
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
}

module.exports = new Tabelas;
