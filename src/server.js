const customExpress = require('./config/customExpress');
const db = require('./infra/dbConexao');
const Tabelas = require('./infra/Tabelas');

// Cria as tabelas se não existirem.
Tabelas.criaTabelas(db);

const app = customExpress();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Servidor ouvindo na porta ${PORT}!`));
