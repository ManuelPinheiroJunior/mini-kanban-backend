import { ColumnRepository } from "../../application/repositories/ColumnRepository";
import { Column } from "../../domain/entities/Column";
import { prisma } from "../database/prismaClient";

export class PrismaColumnRepository implements ColumnRepository {
  async create(column: Column): Promise<Column> {
    return prisma.column.create({ data: column });
  }

  async findById(id: string): Promise<Column | null> {
    return prisma.column.findUnique({ where: { id } });
  }
}
