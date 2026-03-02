import { NextFunction, Request, Response } from "express";
import {
  CreateBoardUseCase,
  GetBoardDetailsUseCase,
  ListBoardsUseCase
} from "../../application/use-cases/BoardUseCases";

export class BoardController {
  constructor(
    private readonly createBoardUseCase: CreateBoardUseCase,
    private readonly listBoardsUseCase: ListBoardsUseCase,
    private readonly getBoardDetailsUseCase: GetBoardDetailsUseCase
  ) {}

  create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const board = await this.createBoardUseCase.execute(req.body.name);
      res.status(201).json(board);
    } catch (error) {
      next(error);
    }
  };

  list = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const boards = await this.listBoardsUseCase.execute();
      res.status(200).json(boards);
    } catch (error) {
      next(error);
    }
  };

  details = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const boardId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const board = await this.getBoardDetailsUseCase.execute(boardId);
      res.status(200).json(board);
    } catch (error) {
      next(error);
    }
  };
}
