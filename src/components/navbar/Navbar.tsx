import { ListIcon } from "@phosphor-icons/react";
import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [menuAberto, setMenuAberto] = useState(false);

  return (
    <header className="bg-[#00856F] w-full fixed top-0 left-0 z-50">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-4 py-4 sm:px-20">
        <div>
          <h1 className="text-white font-semibold text-2xl">Nutrihub</h1>
        </div>

        <ul className="hidden md:flex text-amber-50 gap-10">
          <li className="hover:underline hover:cursor-pointer">
            {" "}
            <Link to="/home"> Home</Link>
          </li>
          <li className="hover:underline hover:cursor-pointer">
            <Link to="/perfil">Perfil</Link>
          </li>
          <li className="hover:underline hover:cursor-pointer">
            <Link to="/refeicoes">Refeições</Link>
          </li>
          <li className="hover:underline hover:cursor-pointer">
            <Link to="/categorias">Categorias</Link>
          </li>
        </ul>

        <div className="hidden md:block">
          <Link
            to="/login"
            className="px-6 py-2 rounded-xl border text-white font-semibold hover:bg-white hover:text-[#00856F] transition-all duration-300"
          >
            ENTRAR
          </Link>
        </div>

        {/* Icone mobile */}
        <button
          className="md:hidden text-white"
          onClick={() => setMenuAberto(!menuAberto)}
        >
          <ListIcon size={32} weight="bold" />
        </button>
      </nav>

      {/* Menu Mobile */}
      {menuAberto && (
        <div className="md:hidden bg-[#006d5b] flex flex-col items-center gap-4 py-6 text-white">
          <span className="hover:underline hover:cursor-pointer">
            {" "}
            <Link to="/home"> Home</Link>
          </span>
          <span className="hover:underline hover:cursor-pointer">
            <Link to="/perfil">Perfil</Link>
          </span>
          <span className="hover:underline hover:cursor-pointer">
            <Link to="/refeicoes">Refeições</Link>
          </span>
          <span className="hover:underline hover:cursor-pointer">
            <Link to="/categorias">Categorias</Link>
          </span>
          <Link
            to="/login"
            className="mt-4 px-6 py-2 rounded-xl border font-semibold"
          >
            ENTRAR
          </Link>
        </div>
      )}
    </header>
  );
}

export default Navbar;
