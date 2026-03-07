import type { Refeicao } from "./Refeicao";

export interface Categoria {
  id: number;
  descricao: string;
  refeicao?: Refeicao[] | null;
}
