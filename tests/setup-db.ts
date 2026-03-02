import { prisma } from "../src/infrastructure/database/prismaClient";

beforeAll(async () => {
  if (process.env.SKIP_DB_SETUP === "true") {
    return;
  }
  await prisma.$connect();
});

beforeEach(async () => {
  if (process.env.SKIP_DB_SETUP === "true") {
    return;
  }
  await prisma.card.deleteMany();
  await prisma.column.deleteMany();
  await prisma.board.deleteMany();
});

afterAll(async () => {
  if (process.env.SKIP_DB_SETUP === "true") {
    return;
  }
  await prisma.$disconnect();
});
