import { useEffect, useState, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import type Restaurante from "../../models/Restaurante";
import { cadastrarUsuario } from "../../services/Service";
import { ToastAlerta } from "../../utils/ToastAlerta";

function Cadastro() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [confirmarSenha, setConfirmarSenha] = useState<string>("");

  const [usuario, setUsuario] = useState<Restaurante>({
    id: 0,
    nome: "",
    usuario: "",
    senha: "",
    foto: "",
  });

  function retornar() {
    navigate("/");
  }

  useEffect(() => {
    if (usuario.id !== 0) {
      retornar();
    }
  }, [usuario]);

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  }

  function handleConfirmarSenha(e: ChangeEvent<HTMLInputElement>) {
    setConfirmarSenha(e.target.value);
  }

  async function cadastrarNovoUsuario(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();

    if (confirmarSenha === usuario.senha && usuario.senha.length >= 8) {
      setIsLoading(true);

      try {
        await cadastrarUsuario(`/restaurantes/cadastrar`, usuario, setUsuario);
        ToastAlerta("Usuário cadastrado com sucesso!", "sucesso");
      } catch (error) {
        ToastAlerta("Erro ao cadastrar o usuário!", "erro");
      }
    } else {
      ToastAlerta(
        "Dados do usuário inconsistentes! Verifique as informações do cadastro.",
        "info",
      );
      setUsuario({ ...usuario, senha: "" });
      setConfirmarSenha("");
    }

    setIsLoading(false);
  }
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 h-screen place-items-center font-bold">
        <div
          className="hidden md:flex w-full min-h-screen bg-gradient-to-br 
               from-[#004D40] 
               via-[#00856F] 
               to-[#00C2A0]
                items-center 
                justify-center 
                text-white 
                p-12"
        >
          <div className="max-w-md text-center space-y-6">
            <h1 className="text-4xl font-bold">NutriHub</h1>

            <p className="text-lg opacity-90">
              Tecnologia que impulsiona a gestão do seu restaurante!
            </p>
          </div>
        </div>
        <form
          className="flex justify-center items-center flex-col w-[90vw] md:w-2/3 gap-4 shadow-xl rounded-xl bg-white p-8"
          onSubmit={cadastrarNovoUsuario}
        >
          <h2 className="text-slate-900 text-4xl md:text-5xl">Cadastre-se</h2>
          <div className="flex flex-col w-full">
            <label htmlFor="nome">Nome</label>
            <input
              type="text"
              id="nome"
              name="nome"
              placeholder="Nome"
              className=" w-full border border-gray-300 rounded-md px-4 py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-[#00856F] focus:border-[#00856F] transition"
              value={usuario.nome}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                atualizarEstado(e)
              }
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="usuario">Usuario</label>
            <input
              type="text"
              id="usuario"
              name="usuario"
              placeholder="Usuario"
              className="w-full border border-gray-300 rounded-md px-4 py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-[#00856F] focus:border-[#00856F] transition"
              value={usuario.usuario}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                atualizarEstado(e)
              }
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="foto">Foto</label>
            <input
              type="text"
              id="foto"
              name="foto"
              placeholder="Foto"
              className="w-full border border-gray-300 rounded-md px-4 py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-[#00856F] focus:border-[#00856F] transition"
              value={usuario.foto}
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
              value={usuario.senha}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                atualizarEstado(e)
              }
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="confirmarSenha">Confirmar Senha</label>
            <input
              type="password"
              id="confirmarSenha"
              name="confirmarSenha"
              placeholder="Confirmar Senha"
              className="w-full border border-gray-300 rounded-md px-4 py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-[#00856F] focus:border-[#00856F] transition"
              value={confirmarSenha}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleConfirmarSenha(e)
              }
            />
          </div>
          <div className="flex justify-around w-full gap-8">
            <button
              type="reset"
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
              onClick={retornar}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className=" w-full border-0 rounded-md px-2 py-2.5 
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
                <span>Cadastrar</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Cadastro;
