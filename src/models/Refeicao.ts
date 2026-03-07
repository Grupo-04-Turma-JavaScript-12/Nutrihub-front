import type { Categoria } from "./Categoria";
import type { Restaurante } from "./Restaurante";

export interface Refeicao{
   
  id:number;
  titulo: string;
  texto: string;
  data: string;
  categoria: Categoria | null;
  restaurante: Restaurante| null;
}