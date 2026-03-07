import type Refeicao from "./Refeicao";

export default interface Categoria {
  id: number;
  descricao: string;
  refeicao?: Refeicao[] | null;
}
