export interface Board {
  id: string;
  name: string;
}

export interface BoardDetails extends Board {
  columns: BoardColumnWithCards[];
}

export interface BoardColumnWithCards {
  id: string;
  name: string;
  order: number;
  boardId: string;
  cards: CardEntity[];
}

export interface CardEntity {
  id: string;
  title: string;
  description: string | null;
  columnId: string;
}
