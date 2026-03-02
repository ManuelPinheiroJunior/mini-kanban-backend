import { NextFunction, Request, Response } from "express";
import { CreateColumnUseCase } from "../../application/use-cases/ColumnUseCases";

export class ColumnController {
  constructor(private readonly createColumnUseCase: CreateColumnUseCase) {}

  create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const boardId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const column = await this.createColumnUseCase.execute({
        boardId,
        name: req.body.name,
        order: req.body.order
      });

      res.status(201).json(column);
    } catch (error) {
      next(error);
    }
  };
}
