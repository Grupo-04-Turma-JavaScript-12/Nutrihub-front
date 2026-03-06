import { PencilIcon, TrashIcon } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import type Categoria from "../../../models/Categoria";

interface CardCategriaProps {
  categoria: Categoria;
}

function CardCategoria({ categoria }: CardCategriaProps) {
  return (
    <article>
      <div className="grid md:grid-cols-3 gap-4 bg-[#00856F] rounded-sm p-4 text-white font-semibold">
        <div className="flex gap-2">
          <p className="md:hidden">Nome:</p>
          <p>{categoria.nome}</p>
        </div>
        <div className="flex gap-2">
          <p className="md:hidden">Descrição:</p>
          <p>{categoria.descricao}</p>
        </div>
        <div className="flex gap-6 items-center justify-end">
          <Link to={`/editarcategoria/${categoria.id}`}>
            <button className="flex items-center justify-center hover:cursor-pointer hover:translate-y-1 transition-all duration-300">
              <PencilIcon size={24} color="#ffffff" />
              <p>Editar</p>
            </button>
          </Link>
          <Link to={`/deletarcategoria/${categoria.id}`}>
            <button className="flex items-center justify-center hover:cursor-pointer transition-all duration-300 hover:translate-y-1 hover:rounded-sm">
              <TrashIcon size={24} color="#ffffff" />
              <p>Deletar</p>
            </button>
          </Link>
        </div>
      </div>
    </article>
  );
}

export default CardCategoria;
