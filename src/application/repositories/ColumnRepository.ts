import { Column } from "../../domain/entities/Column";

export interface ColumnRepository {
  create(column: Column): Promise<Column>;
  findById(id: string): Promise<Column | null>;
}
