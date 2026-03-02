import { v4 as uuidv4 } from "uuid";
import { Column } from "../../domain/entities/Column";
import { NotFoundError } from "../../domain/errors/NotFoundError";
import { ValidationError } from "../../domain/errors/ValidationError";
import { BoardRepository } from "../repositories/BoardRepository";
import { ColumnRepository } from "../repositories/ColumnRepository";

interface CreateColumnInput {
  boardId: string;
  name: string;
  order: number;
}

export class CreateColumnUseCase {
  constructor(
    private readonly boardRepository: BoardRepository,
    private readonly columnRepository: ColumnRepository
  ) {}

  async execute(input: CreateColumnInput): Promise<Column> {
    if (!input.name || !input.name.trim()) {
      throw new ValidationError("Column name is required.");
    }

    if (!Number.isInteger(input.order) || input.order < 0) {
      throw new ValidationError("Column order must be a non-negative integer.");
    }

    const board = await this.boardRepository.findById(input.boardId);
    if (!board) {
      throw new NotFoundError("Board not found.");
    }

    const column: Column = {
      id: uuidv4(),
      name: input.name.trim(),
      order: input.order,
      boardId: input.boardId
    };

    return this.columnRepository.create(column);
  }
}
