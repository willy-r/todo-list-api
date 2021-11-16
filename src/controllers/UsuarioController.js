const md5 = require('md5');

const Usuario = require('../models/Usuario');

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
      const usuario = await Usuario.buscaUsuario(id);
      res.status(200).json(usuario);
    } catch (err) {
      res.status(400).json(err);
    }
  });

  app.post('/api/usuario', async (req, res) => {
    const dadosUsuario = {
      nome: req.body.nome,
      email: req.body.email,
      senha: req.body.senha ? md5(req.body.senha) : null, // Criptografa a senha.
    };
    
    try {
      const infoUsuario = await Usuario.addUsuario(dadosUsuario);
      res.status(200).json(infoUsuario);
    } catch (err) {
      res.status(400).json(err);
    }
  });

  app.patch('/api/usuario/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const dadosUsuario = {
      email: req.body.email ? req.body.email : null,
      nome: req.body.nome ? req.body.nome : null,
      senha: req.body.senha ? md5(req.body.senha) : null, // Criptografa a nova senha.
    };

    try {
      const infoUsuario = await Usuario.atualizaUsuario(id, dadosUsuario);
      res.status(200).json(infoUsuario);
    } catch (err) {
      res.status(400).json(err);
    }
  });
}

module.exports = UsuarioController;
