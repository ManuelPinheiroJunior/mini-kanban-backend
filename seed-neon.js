const { PrismaClient } = require("@prisma/client");
const { randomUUID } = require("crypto");

const prisma = new PrismaClient();

async function run() {
  const boardId = randomUUID();
  const todoId = randomUUID();
  const doingId = randomUUID();
  const doneId = randomUUID();

  await prisma.card.deleteMany({});
  await prisma.column.deleteMany({});
  await prisma.board.deleteMany({});

  await prisma.board.create({
    data: {
      id: boardId,
      name: "Roadmap Produto",
      columns: {
        create: [
          {
            id: todoId,
            name: "To Do",
            order: 0,
            cards: {
              create: [
                {
                  id: randomUUID(),
                  title: "Definir requisitos MVP",
                  description: "Fechar escopo inicial com time"
                },
                {
                  id: randomUUID(),
                  title: "Criar wireframes",
                  description: "Tela de board e card details"
                }
              ]
            }
          },
          {
            id: doingId,
            name: "Doing",
            order: 1,
            cards: {
              create: [
                {
                  id: randomUUID(),
                  title: "Implementar auth",
                  description: "JWT + refresh token"
                }
              ]
            }
          },
          {
            id: doneId,
            name: "Done",
            order: 2,
            cards: {
              create: [
                {
                  id: randomUUID(),
                  title: "Setup CI",
                  description: "Pipeline de testes e build"
                }
              ]
            }
          }
        ]
      }
    }
  });

  const counts = {
    boards: await prisma.board.count(),
    columns: await prisma.column.count(),
    cards: await prisma.card.count()
  };

  console.log(
    JSON.stringify(
      {
        ok: true,
        boardId,
        columns: { todoId, doingId, doneId },
        counts
      },
      null,
      2
    )
  );
}

run()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
