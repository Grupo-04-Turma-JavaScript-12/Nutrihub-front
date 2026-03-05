import { useContext, useState, type ChangeEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { AuthContext } from "../../contexts/AuthContext";
import type { RestauranteLogin } from "../../models/RestauranteLogin";

function Login() {
  const navigate = useNavigate();

  const { restaurante, handleLogin, isLoading } = useContext(AuthContext);

  const [restauranteLogin, setUsuarioLogin] = useState<RestauranteLogin>(
    {} as RestauranteLogin
  );

  /*useEffect(() => {
    if (restaurante.token !== "") {
        navigate('/home')
    }
}, [restaurante])*/

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setUsuarioLogin({
      ...restauranteLogin,
      [e.target.name]: e.target.value,
    });
  }

  function login(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    handleLogin(restauranteLogin);
  }

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 h-screen place-items-center font-bold  shadow-2xl bg-slate-100 ">
        <form
          className="flex justify-center items-center flex-col w-[90vw] md:w-1/2 gap-4 shadow-xl rounded-xl bg-white p-8 "
          onSubmit={login}
        >
          <h2 className="text-slate-900 text-5xl ">Entrar</h2>
          <div className="flex flex-col w-full">
            <label htmlFor="usuario">Usuário</label>
            <input
              type="text"
              id="usuario"
              name="usuario"
              placeholder="Usuario"
              className="w-full border border-gray-300 rounded-md px-4 py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-[#00856F] focus:border-[#00856F] transition"
              value={restauranteLogin.usuario}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                atualizarEstado(e)
              }
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="senha">Senha</label>
            <input
              type="password"
              id="senha"
              name="senha"
              placeholder="Senha"
              className="w-full border border-gray-300 rounded-md px-4 py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-[#00856F] focus:border-[#00856F] transition"
              value={restauranteLogin.senha}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                atualizarEstado(e)
              }
            />
          </div>
          <button
            type="submit"
            className="w-full border-0 rounded-md px-4 py-2.5 
               text-white
               bg-gradient-to-br 
               from-[#00A884] 
               to-[#005F4F]
               focus:outline-none 
               focus:ring-2 
               focus:ring-[#00856F] 
               hover:opacity-80
               transition
               hover:cursor-pointer"
          >
            {isLoading ? (
              <ClipLoader color="#ffffff" size={24} />
            ) : (
              <span>Entrar</span>
            )}
          </button>

          <hr className="border-slate-800 w-full" />

          <p className="text-sm">
            Ainda não tem uma conta?{" "}
            <Link to="/cadastro" className="text-[#00856F] hover:underline">
              Cadastre-se
            </Link>
          </p>
        </form>
        <div
          className="hidden lg:flex w-full min-h-screen 
               bg-gradient-to-br 
              from-[#00C2A0] 
              via-[#009B7A] 
              to-[#004D40]
                items-center 
                justify-center 
                text-white 
                p-12"
        >
          <h1 className="text-white text-4xl font-bold text-center px-10">
            Bem-vindo ao Nutrihub
          </h1>
        </div>
      </div>
    </>
  );
}

export default Login;
