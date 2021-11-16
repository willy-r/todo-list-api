const Usuario = require('../models/Usuario');
const md5 = require('md5');

function UsuarioController(app) {
  app.get('/api/usuarios', async (_, res) => {
    try {
      const usuarios = await Usuario.listaUsuarios();
      res.status(200).json(usuarios);
    } catch (err) {
      res.status(400).json(err);
    }
  });

  app.get('/api/usuario/:id', async (req, res) => {
    const id = parseInt(req.params.id);

    try {
      const usuario = await Usuario.buscaUsuarioPorID(id);
      res.status(200).json(usuario);
    } catch (err) {
      res.status(400).json(err);
    }
  });

  app.post('/api/usuario', async (req, res) => {
    const novoUsuario = {
      nome: req.body.nome,
      email: req.body.email,
      senha: md5(req.body.senha), // Criptografa a senha.
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
