
function Footer() {
    return (
        <footer className="bg-[#00856F] text-amber-50">
            <div className="container mx-auto flex flex-col gap-8 md:grid md:grid-cols-3 md:px-0 p-4">
                <div className="flex flex-col gap-12 justify-center">
                    <div className="flex flex-col items-center gap-2">
                        <h2 className="text-2xl font-semibold">Nutrihub</h2>
                        <p className="text-sm">© 2026 - NutriHub</p>
                        <p className="text-sm">Todos os direitos reservados.</p>
                    </div>
                    <div className="hidden md:flex md:justify-center">

                    </div>
                </div>

                <div className="flex flex-col gap-2 text-center">
                    <h3 className="text-lg font-medium">Projeto</h3>
                    <p className="text-sm">Equipe de Desenvolvimento: </p>
                    <ul className="text-sm">
                        <li>Alberto Duran</li>
                        <li>André Cesar</li>
                        <li>Bruna Melo</li>
                        <li>Giovanna Roberta</li>
                        <li>Jacqueline Marques</li>
                        <li>Renato Sales</li>
                    </ul>
                </div>
            </div>

        </footer>
    );
}

export default Footer;