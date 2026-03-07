import { CheckIcon } from "@phosphor-icons/react";
import type Plano from "../../../models/Plano";

interface CardPlanoProps {
  plano: Plano;
}

function CardPlano({ plano }: CardPlanoProps) {
  return (
    <article
      className={` ${plano.destaque_texto} ${plano.destaque_fundo} flex flex-col gap-4 shadow rounded-2xl overflow-hidden p-1 duration-300
                hover:-translate-y-2
                hover:shadow-xl"`}
    >
      <div
        className={`${plano.destaque} rounded-2xl py-4 px-2 flex flex-col items-center gap-4`}
      >
        <h3 className="font-bold text-2xl">{plano.titulo}</h3>
        <p>
          <span className="text-2xl">R$ {plano.preco}</span> por mês.
        </p>
        <p>{plano.descricao}</p>
        <div className="flex justify-center">
          <button
            className={` ${plano.destaque_botao} px-12 py-1 rounded-sm font-semibold hover:cursor-pointer ${plano.destaque_botao_hover} hover:text-white`}
          >
            Contratar
          </button>
        </div>
      </div>
      <div className={`flex flex-col gap-2 px-2 pb-4`}>
        <p>Esse plano é composto por:</p>
        <div className="flex items-center gap-2">
          <ul className="flex flex-col gap-2">
            {plano.coberturas.map((cobertura, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className={`rounded-full ${plano.destaque_svg} p-0.5`}>
                  <CheckIcon size={18} />
                </div>
                <p>{cobertura}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}

export default CardPlano;
