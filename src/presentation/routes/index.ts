import { Router } from "express";
import {
  CreateBoardUseCase,
  GetBoardDetailsUseCase,
  ListBoardsUseCase
} from "../../application/use-cases/BoardUseCases";
import { CreateColumnUseCase } from "../../application/use-cases/ColumnUseCases";
import {
  CreateCardUseCase,
  DeleteCardUseCase,
  MoveCardUseCase,
  UpdateCardUseCase
} from "../../application/use-cases/CardUseCases";
import { CardMoveDomainService } from "../../domain/services/CardMoveDomainService";
import { PrismaBoardRepository } from "../../infrastructure/repositories/PrismaBoardRepository";
import { PrismaCardRepository } from "../../infrastructure/repositories/PrismaCardRepository";
import { PrismaColumnRepository } from "../../infrastructure/repositories/PrismaColumnRepository";
import { BoardController } from "../controllers/BoardController";
import { CardController } from "../controllers/CardController";
import { ColumnController } from "../controllers/ColumnController";

const router = Router();

const boardRepository = new PrismaBoardRepository();
const columnRepository = new PrismaColumnRepository();
const cardRepository = new PrismaCardRepository();

const boardController = new BoardController(
  new CreateBoardUseCase(boardRepository),
  new ListBoardsUseCase(boardRepository),
  new GetBoardDetailsUseCase(boardRepository)
);

const columnController = new ColumnController(
  new CreateColumnUseCase(boardRepository, columnRepository)
);

const cardController = new CardController(
  new CreateCardUseCase(cardRepository, columnRepository),
  new UpdateCardUseCase(cardRepository),
  new DeleteCardUseCase(cardRepository),
  new MoveCardUseCase(cardRepository, columnRepository, new CardMoveDomainService())
);

router.post("/boards", boardController.create);
router.get("/boards", boardController.list);
router.get("/boards/:id", boardController.details);

router.post("/boards/:id/columns", columnController.create);

router.post("/columns/:id/cards", cardController.create);
router.put("/cards/:id", cardController.update);
router.delete("/cards/:id", cardController.delete);
router.patch("/cards/:id/move", cardController.move);

export { router };
