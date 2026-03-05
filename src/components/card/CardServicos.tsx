import type CardServicos from "../../models/Servicos";

interface CardLadingProps {
    card: CardServicos
}

function CardLanding({ card }: CardLadingProps) {
    return (
        <div className="border border-slate-300 p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-bold mb-2">
                {card.titulo}
            </h3>
            <p className="text-gray-600">
                {card.descricao}
            </p>
        </div>
    )
}

export default CardLanding;