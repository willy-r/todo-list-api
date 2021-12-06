# TODO List API

TODO List API com NodeJS e Express.


## Informações gerais

- Essa API usa a versão **14.18.1** do NodeJS
- O banco de dados usado foi o SQLite
- A API está hospedada no Heroku: [link](#todo)


## Rotas API

Rotas cadastradas para fazer requisições:

### Rotas para Usuários

| Método | Rota | Ação |
| ------ | ---- | ---- |
| GET | /api/usuarios | Busca todos os usuários |
| GET | /api/usuario/1 | Busca o usuário com o id=1 |
| POST | /api/usuario | Adiciona um novo usuário |
| POST | /api/usuario/login | Loga usuário |
| PATCH | /api/usuario/1 | Atualiza alguns campos do usuário com o id=1 |
| DELETE | /api/usuario/1 | Deleta o usuário com o id=1 |

### Rotas para Tarefas

| Método | Rota | Ação |
| ------ | ---- | ---- |
| GET | /api/tarefas | Busca todas as tarefas de todos os usuários |
| GET | /api/tarefas/1 | Busca todas as tarefas do usuário com id=1 |
| GET | /api/tarefa/1 | Busca a tarefa com o id=1 |
| POST | /api/tarefa | Adiciona uma nova tarefa |
| PATCH | /api/tarefa/1 | Atualiza alguns campos da tarefa com o id=1 |
| DELETE | /api/tarefa/1 | Deleta a tarefa com o id=1 |


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


## Autor

- [William Rodrigues](https://github.com/willy-r)
