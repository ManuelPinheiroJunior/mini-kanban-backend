import { v4 as uuidv4 } from "uuid";
import { Board, BoardDetails } from "../../domain/entities/Board";
import { NotFoundError } from "../../domain/errors/NotFoundError";
import { ValidationError } from "../../domain/errors/ValidationError";
import { BoardRepository } from "../repositories/BoardRepository";

export class CreateBoardUseCase {
  constructor(private readonly boardRepository: BoardRepository) {}

  async execute(name: string): Promise<Board> {
    if (!name || !name.trim()) {
      throw new ValidationError("Board name is required.");
    }

    const board: Board = {
      id: uuidv4(),
      name: name.trim()
    };

    return this.boardRepository.create(board);
  }
}

export class ListBoardsUseCase {
  constructor(private readonly boardRepository: BoardRepository) {}

  async execute(): Promise<Board[]> {
    return this.boardRepository.findAll();
  }
}

export class GetBoardDetailsUseCase {
  constructor(private readonly boardRepository: BoardRepository) {}

  async execute(boardId: string): Promise<BoardDetails> {
    const board = await this.boardRepository.findDetailsById(boardId);

    if (!board) {
      throw new NotFoundError("Board not found.");
    }

    return board;
  }
}
