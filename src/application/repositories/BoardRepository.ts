import { Board, BoardDetails } from "../../domain/entities/Board";

export interface BoardRepository {
  create(board: Board): Promise<Board>;
  findAll(): Promise<Board[]>;
  findById(id: string): Promise<Board | null>;
  findDetailsById(id: string): Promise<BoardDetails | null>;
}
