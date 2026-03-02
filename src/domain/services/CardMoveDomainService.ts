import { ValidationError } from "../errors/ValidationError";

interface MoveContext {
  sourceBoardId: string;
  destinationBoardId: string;
}

export class CardMoveDomainService {
  ensureMoveAllowed({ sourceBoardId, destinationBoardId }: MoveContext): void {
    if (sourceBoardId !== destinationBoardId) {
      throw new ValidationError("Card only can move between columns of the same board.");
    }
  }
}
