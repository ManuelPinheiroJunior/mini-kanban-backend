import { CardRepository } from "../../src/application/repositories/CardRepository";
import { ColumnRepository } from "../../src/application/repositories/ColumnRepository";
import { MoveCardUseCase } from "../../src/application/use-cases/CardUseCases";
import { ValidationError } from "../../src/domain/errors/ValidationError";
import { CardMoveDomainService } from "../../src/domain/services/CardMoveDomainService";

describe("MoveCardUseCase", () => {
  it("should throw when destination column is from another board", async () => {
    const cardRepository: CardRepository = {
      create: jest.fn(),
      findById: jest.fn(),
      findByIdWithBoard: jest.fn(async () => ({
        id: "card-id",
        title: "Task",
        description: null,
        columnId: "col-a",
        boardId: "board-a"
      })),
      update: jest.fn(),
      delete: jest.fn(),
      move: jest.fn()
    };

    const columnRepository: ColumnRepository = {
      create: jest.fn(),
      findById: jest.fn(async () => ({
        id: "col-b",
        name: "Done",
        order: 1,
        boardId: "board-b"
      }))
    };

    const useCase = new MoveCardUseCase(cardRepository, columnRepository, new CardMoveDomainService());

    await expect(useCase.execute({ cardId: "card-id", newColumnId: "col-b" })).rejects.toBeInstanceOf(
      ValidationError
    );
  });
});
