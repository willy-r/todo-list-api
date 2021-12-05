const Usuario = require('../models/Usuario');

const UsuarioController = (app, db) => {
  // Cria instância de Usuario.
  const usuarioObj = new Usuario(db);

  app.get('/api/usuarios', async (_, res) => {
    try {
      const usuarios = await usuarioObj.listaUsuarios();
      
      res.json({
        erro: false,
        usuarios: usuarios,
      });
    } catch (err) {
      res.json({
        erro: true,
        msg: err,
      });
    }
  });

  app.get('/api/usuario/:id', async (req, res) => {
    const id = parseInt(req.params.id);

    try {
      const usuario = await usuarioObj.buscaUsuario(id);

      res.json({
        erro: false,
        usuario: usuario,
      });
    } catch (err) {
      res.json({
        erro: true,
        msg: err,
      });
    }
  });

  app.post('/api/usuario', async (req, res) => {
    const body = { ...req.body };
    
    try {
      const usuarioCriado = await usuarioObj.addUsuario(body);
      
      res.json({
        erro: false,
        usuarioCriado: usuarioCriado,
      });
    } catch (err) {
      res.json({
        erro: true,
        msg: err,
      });
    }
  });

  app.post('/api/usuario/login', async (req, res) => {
    const body = { ...req.body };

    try {
      const infoUsuarioLogado = await usuarioObj.logaUsuario(body);

      res.json({
        erro: false,
        info: infoUsuarioLogado,
      });
    } catch (err) {
      res.json({
        erro: true,
        msg: err,
      });
    }
  });

  app.patch('/api/usuario/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const body = { ...req.body };

    try {
      const infoUsuarioAtualizado = await usuarioObj.atualizaUsuario(id, body);
      
      res.json({
        erro: false,
        info: infoUsuarioAtualizado,
      });
    } catch (err) {
      res.json({
        erro: true,
        msg: err,
      });
    }
  });

  app.delete('/api/usuario/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    
    try {
      const infoUsuarioDeletado = await usuarioObj.deletaUsuario(id);
      
      res.json({
        erro: false,
        info: infoUsuarioDeletado,
      });
    } catch (err) {
      res.json({
        erro: true,
        msg: err,
      });
    }
  });
}

module.exports = UsuarioController;
