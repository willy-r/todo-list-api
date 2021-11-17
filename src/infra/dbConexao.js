const sqlite3 = require('sqlite3').verbose();

const dbArquivo = './db.sqlite3';

// Cria conexão com o banco de dados.
const db = new sqlite3.Database(dbArquivo, (err) => {
  if (err) {
    console.log('Erro ao conectar no banco de dados:', err.message);
    return;
  }

  console.log('Conectado ao banco de dados SQLite!');
});

// Encerra a conexão com o banco de dados quando fecha o servidor.
process.on('SIGINT', () => {
  db.close((err) => {
    if (err) {
      console.log('Erro ao fechar o banco de dados:', err.message);
      return;
    }
    
    console.log('Conexão com o banco de dados encerrada!');
    process.exit(1);
  });
});

module.exports = db;
