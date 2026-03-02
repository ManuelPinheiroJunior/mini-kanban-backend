import { CreateBoardUseCase } from "../../src/application/use-cases/BoardUseCases";
import { BoardRepository } from "../../src/application/repositories/BoardRepository";

describe("CreateBoardUseCase", () => {
  it("should create a board with valid name", async () => {
    const boardRepository: BoardRepository = {
      create: jest.fn(async (board) => board),
      findAll: jest.fn(),
      findById: jest.fn(),
      findDetailsById: jest.fn()
    };

    const useCase = new CreateBoardUseCase(boardRepository);
    const result = await useCase.execute("Projeto Alpha");

    expect(result.id).toBeDefined();
    expect(result.name).toBe("Projeto Alpha");
    expect(boardRepository.create).toHaveBeenCalledTimes(1);
  });
});
