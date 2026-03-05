import fotomarmita from "../../assets/marmita.png"

function Sobrenos() {
    return (
        <div className="bg-[#FFFAF1]">
            <section className="container mx-auto flex flex-col md:flex-row items-center p-8 justify-center gap-12">
                <div className="w-full md:max-w-md">
                    <img
                        src={fotomarmita}
                        alt="Alguém preparando refeições"
                        className="rounded-2xl w-full shadow-lg"
                    />
                </div>
                <div className="w-full md:w-1/2">
                    <h4 className="font-semibold text-[#00856F]">SOBRE NÓS</h4>
                    <h2 className="text-3xl font-bold py-2">
                        Entenda quem somos e porque existimos
                    </h2>
                    <p className="py-2">
                        O NutriHub nasceu com um propósito simples: tornar a alimentação saudável acessível, prática e personalizada para o dia a dia.
                        Conectamos pessoas a refeições equilibradas, preparadas com ingredientes frescos e selecionados por profissionais que entendem de nutrição e bem-estar.
                        Mais do que entregar comida, entregamos cuidado, saúde e conveniência na sua porta.
                    </p>
                </div>
            </section>
        </div>
    )
}

export default Sobrenos