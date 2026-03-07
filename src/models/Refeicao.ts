import type Categoria from "./Categoria";
import type Restaurante from "./Restaurante";

export default interface Refeicao {
  id: number;
  nome: string;
  foto: string;
  descricao: string;
  preco: number;
  categoria: Categoria | null;
  restaurante: Restaurante | null;
}
