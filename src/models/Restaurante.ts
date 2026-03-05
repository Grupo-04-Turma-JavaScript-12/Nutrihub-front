import type { Refeicao } from "./Refeicao";

export interface Restaurante {
  id: number;
  nome: string;
  usuario: string;
  senha: string;
  foto: string;
  refeicao?: Refeicao[] | null;
}
