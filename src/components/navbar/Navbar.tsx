import { ListIcon } from "@phosphor-icons/react";
import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom"; // Importe o useLocation
import { AuthContext } from "../../contexts/AuthContext";
import { ToastAlerta } from "../../utils/ToastAlerta";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation(); // Hook para pegar a rota atual

  const { restaurante, handleLogout } = useContext(AuthContext);

  function logout() {
    handleLogout();
    ToastAlerta("O Usuário foi desconectado com sucesso!", "info");
    navigate("/");
  }

  const [menuAberto, setMenuAberto] = useState(false);

  // Definimos as rotas onde o Navbar NÃO deve aparecer
  const rotasSemNavbar = ["/login", "/cadastro"];

  // Se a rota atual estiver na lista acima, retornamos null (nada aparece)
  if (rotasSemNavbar.includes(location.pathname)) {
    return null;
  }

  return (
    <header className="bg-[#00856F] w-full fixed top-0 left-0 z-50">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-4 py-4 sm:px-20">
        <div>
          <h1 className="text-white font-semibold text-2xl">Nutrihub</h1>
        </div>

        <ul className="hidden md:flex text-amber-50 gap-10">
          <li className="hover:underline hover:cursor-pointer">
            <Link to="/home">Home</Link>
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

          {restaurante.token !== "" && (
            <li className="hover:underline hover:cursor-pointer">
              <Link to="" onClick={logout}>
                Sair
              </Link>
            </li>
          )}
        </ul>

        <div className="hidden md:block">
          {restaurante.token === "" ? (
            <Link
              to="/login"
              className="px-6 py-2 rounded-xl border text-white font-semibold hover:bg-white hover:text-[#00856F] transition-all duration-300"
            >
              ENTRAR
            </Link>
          ) : (
            <span className="text-white font-medium">
              Olá, {restaurante.nome}
            </span>
          )}
        </div>

        <button
          className="md:hidden text-white"
          onClick={() => setMenuAberto(!menuAberto)}
        >
          <ListIcon size={32} weight="bold" />
        </button>
      </nav>

      {menuAberto && (
        <div className="md:hidden bg-[#006d5b] flex flex-col items-center gap-4 py-6 text-white">
          <Link to="/home" onClick={() => setMenuAberto(false)}>
            Home
          </Link>
          <Link to="/perfil" onClick={() => setMenuAberto(false)}>
            Perfil
          </Link>
          <Link to="/refeicoes" onClick={() => setMenuAberto(false)}>
            Refeições
          </Link>
          <Link to="/categorias" onClick={() => setMenuAberto(false)}>
            Categorias
          </Link>
          {restaurante.token === "" && (
            <Link
              to="/login"
              className="mt-4 px-6 py-2 rounded-xl border font-semibold"
            >
              ENTRAR
            </Link>
          )}
        </div>
      )}
    </header>
  );
}

export default Navbar;
