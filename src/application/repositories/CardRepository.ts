import { Card } from "../../domain/entities/Card";

export interface CardWithBoard extends Card {
  boardId: string;
}

export interface CardRepository {
  create(card: Card): Promise<Card>;
  findById(id: string): Promise<Card | null>;
  findByIdWithBoard(id: string): Promise<CardWithBoard | null>;
  update(card: Card): Promise<Card>;
  delete(id: string): Promise<void>;
  move(cardId: string, newColumnId: string): Promise<Card>;
}
