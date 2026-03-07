export default interface Plano {
  id: number;
  titulo: string;
  preco: number;
  descricao: string;
  coberturas: string[];
  destaque: string;
  destaque_texto: string;
  destaque_fundo: string;
  destaque_botao: string;
  destaque_botao_hover: string;
  destaque_svg: string;
}
