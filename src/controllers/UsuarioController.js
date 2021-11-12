function UsuarioController(app) {
  app.get('/usuarios', (_, res) => {
    res.send('Rota ativada com GET e recurso "usuario": valores de "usuario" devem ser retornados');
  });

  app.post('/usuarios/criar', (_, res) => {
    res.send('Rota POST de "usuario" ativada: usuário adicionado ao banco de dados');
  });
}

module.exports = UsuarioController;
