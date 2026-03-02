# Mini-Kanban Backend

API RESTful para um sistema Mini-Kanban, construída com Node.js, Express, PostgreSQL e Prisma, seguindo arquitetura em camadas inspirada em DDD e princípios SOLID.

## Stack

- Node.js + Express
- PostgreSQL
- Prisma ORM
- Jest + Supertest
- dotenv
- UUID
- TypeScript

## Estrutura de pastas

```txt
src/
 ├── domain/
 │    ├── entities/
 │    ├── services/
 │    └── errors/
 │
 ├── application/
 │    ├── use-cases/
 │    └── repositories/
 │
 ├── infrastructure/
 │    ├── database/
 │    ├── repositories/
 │    └── config/
 │
 ├── presentation/
 │    ├── controllers/
 │    ├── routes/
 │    └── middlewares/
 │
 ├── app.ts
 └── server.ts
```

## Como configurar `.env`

1. Copie o arquivo de exemplo:

```bash
cp .env.example .env
```

2. Ajuste os valores:

```env
DATABASE_URL='postgresql://default:YOUR_PASSWORD@ep-your-neon-host-pooler.us-east-1.aws.neon.tech/YOUR_DATABASE?sslmode=require&channel_binding=require'
PORT=3000
CORS_ORIGIN=https://mini-kanban-frontend.vercel.app,http://localhost:5173
```

Para testes, use também:

```bash
cp .env.test.example .env.test
```

## Como rodar o banco (PostgreSQL)

Subir bancos de desenvolvimento e teste via Docker:

```bash
docker compose up -d
```

- Banco de desenvolvimento: `localhost:5432`, database `mini_kanban`
- Banco de teste: `localhost:5433`, database `mini_kanban_test`

## Como rodar migrations

Instale dependências:

```bash
npm install
```

Gere o client Prisma:

```bash
npm run prisma:generate
```

Execute migration no banco de desenvolvimento:

```bash
npm run prisma:migrate
```

Para produção:

```bash
npm run prisma:deploy
```

## Como rodar o projeto

Desenvolvimento:

```bash
npm run dev
```

Build:

```bash
npm run build
```

Execução após build:

```bash
npm start
```

## Deploy na Vercel

Este projeto esta configurado para rodar como Serverless Function na Vercel usando `api/index.ts` e `vercel.json`.

1. Suba o repositorio no GitHub/GitLab/Bitbucket e importe na Vercel.
2. Em **Project Settings > Environment Variables**, configure:

```env
DATABASE_URL='postgresql://default:YOUR_PASSWORD@ep-your-neon-host-pooler.us-east-1.aws.neon.tech/YOUR_DATABASE?sslmode=require&channel_binding=require'
CORS_ORIGIN=https://mini-kanban-frontend.vercel.app
```

3. Execute as migrations no banco de producao (fora da Vercel), apontando para o mesmo `DATABASE_URL`:

```bash
npm run prisma:deploy
```

4. Faça o deploy.

Depois do deploy, as mesmas rotas da API continuam funcionando normalmente (`/boards`, `/columns/:id/cards`, etc).

## Como rodar os testes

Garanta que:

- `.env.test` existe e aponta para banco de teste
- migrations foram aplicadas também no banco de teste (use `DATABASE_URL` do teste ao migrar)

Rodar todos os testes:

```bash
npm test
```

Somente unitários:

```bash
npm run test:unit
```

Somente integração:

```bash
npm run test:integration
```

## Endpoints obrigatórios

### Boards

- `POST /boards`
- `GET /boards`
- `GET /boards/:id` (retorna colunas e cards aninhados)

### Columns

- `POST /boards/:id/columns`

### Cards

- `POST /columns/:id/cards`
- `PUT /cards/:id`
- `DELETE /cards/:id`
- `PATCH /cards/:id/move`

Body de move:

```json
{
  "newColumnId": "uuid"
}
```

## Arquitetura (resumo)

- **Domain**: entidades e regras de negócio puras (sem Express/Prisma).
- **Application (Use Cases)**: orquestra regras e validações de negócio.
- **Infrastructure**: implementação concreta de persistência e config.
- **Presentation**: controllers, rotas e tratamento HTTP.

Com isso:

- Controllers ficam magros.
- Regra de negócio fica nos use cases e domain services.
- Banco de dados fica isolado em repositórios.
- Tratamento de erro é centralizado no middleware global.
