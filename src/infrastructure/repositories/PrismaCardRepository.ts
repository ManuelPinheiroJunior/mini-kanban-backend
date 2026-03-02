import { CardRepository, CardWithBoard } from "../../application/repositories/CardRepository";
import { Card } from "../../domain/entities/Card";
import { prisma } from "../database/prismaClient";

export class PrismaCardRepository implements CardRepository {
  async create(card: Card): Promise<Card> {
    return prisma.card.create({ data: card });
  }

  async findById(id: string): Promise<Card | null> {
    return prisma.card.findUnique({ where: { id } });
  }

  async findByIdWithBoard(id: string): Promise<CardWithBoard | null> {
    const card = await prisma.card.findUnique({
      where: { id },
      include: {
        column: {
          select: {
            boardId: true
          }
        }
      }
    });

    if (!card) {
      return null;
    }

    return {
      id: card.id,
      title: card.title,
      description: card.description,
      columnId: card.columnId,
      boardId: card.column.boardId
    };
  }

  async update(card: Card): Promise<Card> {
    return prisma.card.update({
      where: { id: card.id },
      data: {
        title: card.title,
        description: card.description
      }
    });
  }

  async delete(id: string): Promise<void> {
    await prisma.card.delete({ where: { id } });
  }

  async move(cardId: string, newColumnId: string): Promise<Card> {
    return prisma.card.update({
      where: { id: cardId },
      data: {
        columnId: newColumnId
      }
    });
  }
}
