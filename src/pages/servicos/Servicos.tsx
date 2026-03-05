import ListarServicos from "../../components/card/ListaServicos"

function Servicos() {
    return (
        <>
            <section className="py-10">
                <div>
                    <h4 className="text-center font-semibold pb-4 text-[#00856F]">SERVIÇOS</h4>
                    <h2 className="text-3xl text-center font-bold pb-4 ">Como o Nutrihub impulsiona
                        <span className="block">
                            seu restaurante?
                        </span></h2>
                </div>
                <div>
                    <ListarServicos />
                </div>
            </section>
        </>

    )
}

export default Servicos