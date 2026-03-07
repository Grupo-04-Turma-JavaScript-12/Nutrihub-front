import type Refeicao from "./Refeicao";

export default interface Categoria {
  id: number;
  nome: string;
  descricao: string;
  refeicao?: Refeicao[] | null;
}
