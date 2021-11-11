function UsuarioController(app) {
  app.get('/usuarios', (_, res) => {
    res.send(`Rota ativada com GET e recurso "usuarios": valores de "usuarios" devem ser retornados`);
  });
}

module.exports = UsuarioController;
