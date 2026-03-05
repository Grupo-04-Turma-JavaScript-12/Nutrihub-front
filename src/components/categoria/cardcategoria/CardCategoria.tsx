import { Link } from "react-router-dom";
import type Categoria from "../../../models/Categoria";

interface CardCategoriaProps {
  categoria: Categoria;
}
function CardCategoria({ categoria }: CardCategoriaProps) {
  return (
    <div className=" border-slate-900 border 
            flex flex-col rounded overflow-hidden justify-between">
      <header className="py-2 px-6 bg-gray-300 text-black font-bold text-2xl">
        {categoria.nome}
      </header>
      <p className="p-8 text-3xl bg-slate-100 h-full">{categoria.descricao}</p>

      <div className=" flex ">
        <Link
          to={`/editarcategoria/${categoria.id}`}
          className="w-full text-white bg-gray-500
                    hover:bg-gray-900 flex items-center justify-center py-2"
        >
          <button>Editar</button>
        </Link>

        <Link
          to={`/deletarcategoria/${categoria.id}`}
          className="'text-white bg-red-400 
                    hover:bg-red-700 w-full flex items-center justify-center"
        >
          <button>Deletar</button>
        </Link>
      </div>
    </div>
  );
}

export default CardCategoria;
