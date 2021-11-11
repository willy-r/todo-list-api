class Tabelas {
  criaTabelas(db) {
    this.db = db;

    this._criaTabelaUsuario();
  }

  _criaTabelaUsuario() {
    const query = `
      CREATE TABLE IF NOT EXISTS usuario (
        id_usuario INTEGER PRIMARY KEY AUTOINCREMENT,
        nome VARCHAR(100),
        email VARCHAR(150) UNIQUE,
        senha VARCHAR(255)
      );
    `;

    this.db.run(query, (err) => {
      if (err) {
        console.log('Erro na criação da tabela "usuario":', err.message);
        return;
      }

      console.log('Tabela "usuario" criada (ou já existe) com sucesso!');
    });
  }
}

module.exports = new Tabelas;
