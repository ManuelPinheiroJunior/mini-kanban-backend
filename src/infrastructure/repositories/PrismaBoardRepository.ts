import { BoardRepository } from "../../application/repositories/BoardRepository";
import { Board, BoardDetails } from "../../domain/entities/Board";
import { prisma } from "../database/prismaClient";

export class PrismaBoardRepository implements BoardRepository {
  async create(board: Board): Promise<Board> {
    return prisma.board.create({ data: board });
  }

  async findAll(): Promise<Board[]> {
    return prisma.board.findMany({
      orderBy: { name: "asc" }
    });
  }

  async findById(id: string): Promise<Board | null> {
    return prisma.board.findUnique({ where: { id } });
  }

  async findDetailsById(id: string): Promise<BoardDetails | null> {
    return prisma.board.findUnique({
      where: { id },
      include: {
        columns: {
          orderBy: { order: "asc" },
          include: {
            cards: true
          }
        }
      }
    });
  }
}
