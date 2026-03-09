import { PencilIcon, StarIcon, TrashIcon } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import type Refeicao from "../../../models/Refeicao";

interface RefeicaoProps {
  refeicao: Refeicao;
  isRecomendacao?: boolean;
}

function CardRefeicao({ refeicao, isRecomendacao }: RefeicaoProps) {
  return (
    <article className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm w-64">
      <div className="relative h-36 w-full bg-zinc-100">
        <img
          className="h-full w-full object-cover"
          alt={refeicao.nome}
          src={refeicao.foto}
        />
        {isRecomendacao ? (
          <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-amber-400 px-2 py-1 text-[10px] font-bold text-white shadow">
            <StarIcon size={12} weight="fill" />
            Prato do dia
          </div>
        ) : (
          <button
            className="absolute right-3 top-3 grid h-6 w-6 place-items-center rounded-full bg-white/90 text-[12px] text-rose-500 shadow"
            aria-label="favorite"
            title="favorite"
          >
            ♡
          </button>
        )}
      </div>

      <div className="px-4 py-4">
        <h3 className="text-sm font-semibold text-zinc-800">{refeicao.nome}</h3>

        <div className="mt-2 flex items-center gap-2 text-xs text-zinc-500">
          <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-zinc-100">
            ◎
          </span>
          <span>{refeicao.descricao}</span>
        </div>

        <div className="mt-3 flex items-center justify-between">
          <span className="text-xs font-semibold text-zinc-700">
            R$ {refeicao.preco}
          </span>

          <div className="flex items-center gap-2">
            <Link
              to={`/editarrefeicao/${refeicao.id}`}
              className="grid h-7 w-7 place-items-center rounded-full bg-indigo-50 text-indigo-500 hover:bg-indigo-100 transition-colors"
              aria-label="Editar refeição"
              title="Editar"
            >
              <PencilIcon size={15} weight="bold" />
            </Link>

            <Link
              to={`/deletarrefeicao/${refeicao.id}`}
              className="grid h-7 w-7 place-items-center rounded-full bg-rose-50 text-rose-500 hover:bg-rose-100 transition-colors"
              aria-label="Excluir refeição"
              title="Excluir"
            >
              <TrashIcon size={15} weight="bold" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

export default CardRefeicao;
