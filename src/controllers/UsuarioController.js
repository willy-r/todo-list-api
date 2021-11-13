const Usuario = require('../models/Usuario');

function UsuarioController(app) {
  app.get('/usuarios', (_, res) => {
    res.send(`Rota ativada com GET e recurso "usuarios": valores de "usuarios" devem ser retornados`);
  });

  app.post('/usuarios/criar', async (req, res) => {
    const novoUsuario = {
      nome: req.body.nome,
      email: req.body.email,
      senha: req.body.senha,
    };
    
    try {
      const usuario = await Usuario.addUsuario(novoUsuario);
      res.status(200).json(usuario);
    } catch (err) {
      res.status(400).json(err);
    }
  });
}

module.exports = UsuarioController;
