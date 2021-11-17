# TODO List API

TODO List API com NodeJS e Express.


## Rotas API

Rotas cadastradas para fazer requisições:

> Consulte a [wiki](#todo) para detalhes sobre as rotas.

### Rotas para Usuários

| Método | Rota | Ação |
| ------ | ---- | ---- |
| GET | /api/usuarios | Busca todos os usuários |
| GET | /api/usuario/1 | Busca o usuário com o id=1 |
| POST | /api/usuario | Adiciona um novo usuário |
| PATCH | /api/usuario/1 | Atualiza alguns campos do usuário com o id=1 |
| DELETE | /api/usuario/1 | Deleta o usuário com o id=1 |


## Rodando o projeto localmente

Clone e vá para o diretório do projeto:

```bash
git clone https://github.com/willy-r/todo-list-api.git
cd todo-list-api
```

Instale as dependências:

```bash
npm install
```

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```
