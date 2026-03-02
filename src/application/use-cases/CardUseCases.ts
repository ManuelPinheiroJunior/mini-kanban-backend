import { v4 as uuidv4 } from "uuid";
import { Card } from "../../domain/entities/Card";
import { NotFoundError } from "../../domain/errors/NotFoundError";
import { ValidationError } from "../../domain/errors/ValidationError";
import { CardMoveDomainService } from "../../domain/services/CardMoveDomainService";
import { CardRepository } from "../repositories/CardRepository";
import { ColumnRepository } from "../repositories/ColumnRepository";

interface CreateCardInput {
  columnId: string;
  title: string;
  description?: string | null;
}

interface UpdateCardInput {
  id: string;
  title: string;
  description?: string | null;
}

interface MoveCardInput {
  cardId: string;
  newColumnId: string;
}

export class CreateCardUseCase {
  constructor(
    private readonly cardRepository: CardRepository,
    private readonly columnRepository: ColumnRepository
  ) {}

  async execute(input: CreateCardInput): Promise<Card> {
    if (!input.title || !input.title.trim()) {
      throw new ValidationError("Card title is required.");
    }

    const column = await this.columnRepository.findById(input.columnId);
    if (!column) {
      throw new NotFoundError("Column not found.");
    }

    const card: Card = {
      id: uuidv4(),
      title: input.title.trim(),
      description: input.description ?? null,
      columnId: input.columnId
    };

    return this.cardRepository.create(card);
  }
}

export class UpdateCardUseCase {
  constructor(private readonly cardRepository: CardRepository) {}

  async execute(input: UpdateCardInput): Promise<Card> {
    if (!input.title || !input.title.trim()) {
      throw new ValidationError("Card title is required.");
    }

    const card = await this.cardRepository.findById(input.id);
    if (!card) {
      throw new NotFoundError("Card not found.");
    }

    return this.cardRepository.update({
      ...card,
      title: input.title.trim(),
      description: input.description ?? null
    });
  }
}

export class DeleteCardUseCase {
  constructor(private readonly cardRepository: CardRepository) {}

  async execute(cardId: string): Promise<void> {
    const card = await this.cardRepository.findById(cardId);
    if (!card) {
      throw new NotFoundError("Card not found.");
    }

    await this.cardRepository.delete(cardId);
  }
}

export class MoveCardUseCase {
  constructor(
    private readonly cardRepository: CardRepository,
    private readonly columnRepository: ColumnRepository,
    private readonly cardMoveDomainService: CardMoveDomainService
  ) {}

  async execute(input: MoveCardInput): Promise<Card> {
    const card = await this.cardRepository.findByIdWithBoard(input.cardId);
    if (!card) {
      throw new NotFoundError("Card not found.");
    }

    const destinationColumn = await this.columnRepository.findById(input.newColumnId);
    if (!destinationColumn) {
      throw new NotFoundError("Destination column not found.");
    }

    this.cardMoveDomainService.ensureMoveAllowed({
      sourceBoardId: card.boardId,
      destinationBoardId: destinationColumn.boardId
    });

    return this.cardRepository.move(input.cardId, input.newColumnId);
  }
}
