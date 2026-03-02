import { NextFunction, Request, Response } from "express";
import {
  CreateCardUseCase,
  DeleteCardUseCase,
  MoveCardUseCase,
  UpdateCardUseCase
} from "../../application/use-cases/CardUseCases";

export class CardController {
  constructor(
    private readonly createCardUseCase: CreateCardUseCase,
    private readonly updateCardUseCase: UpdateCardUseCase,
    private readonly deleteCardUseCase: DeleteCardUseCase,
    private readonly moveCardUseCase: MoveCardUseCase
  ) {}

  create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const columnId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const card = await this.createCardUseCase.execute({
        columnId,
        title: req.body.title,
        description: req.body.description
      });

      res.status(201).json(card);
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const cardId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const card = await this.updateCardUseCase.execute({
        id: cardId,
        title: req.body.title,
        description: req.body.description
      });

      res.status(200).json(card);
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const cardId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      await this.deleteCardUseCase.execute(cardId);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };

  move = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const cardId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const card = await this.moveCardUseCase.execute({
        cardId,
        newColumnId: req.body.newColumnId
      });

      res.status(200).json(card);
    } catch (error) {
      next(error);
    }
  };
}
