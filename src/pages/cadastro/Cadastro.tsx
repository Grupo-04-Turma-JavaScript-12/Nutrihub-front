import { useEffect, useState, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import type Restaurante from "../../models/Restaurante";
import { cadastrarUsuario } from "../../services/Service";
import { ToastAlerta } from "../../utils/ToastAlerta";

const CLOUD_NAME = import.meta.env.VITE_CLOUD_NAME_CLOUDINARY;
const UPLOAD_PRESET = import.meta.env.VITE_UPLOAD_PRESET;

function Cadastro() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isUploadingFoto, setIsUploadingFoto] = useState<boolean>(false);
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

  async function handleFotoUpload(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingFoto(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        { method: "POST", body: formData },
      );
      const data = await response.json();
      setUsuario((prev) => ({ ...prev, foto: data.secure_url }));
      ToastAlerta("Foto enviada com sucesso!", "sucesso");
    } catch (error) {
      ToastAlerta("Erro ao enviar a foto!", "erro");
    } finally {
      setIsUploadingFoto(false);
    }
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
               from-[#004D40] via-[#00856F] to-[#00C2A0]
               items-center justify-center text-white p-12"
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

          {/* Nome */}
          <div className="flex flex-col w-full">
            <label htmlFor="nome">Nome</label>
            <input
              type="text"
              id="nome"
              name="nome"
              placeholder="Nome"
              className="w-full border border-gray-300 rounded-md px-4 py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-[#00856F] focus:border-[#00856F] transition"
              value={usuario.nome}
              onChange={atualizarEstado}
            />
          </div>

          {/* Usuário */}
          <div className="flex flex-col w-full">
            <label htmlFor="usuario">Usuário</label>
            <input
              type="text"
              id="usuario"
              name="usuario"
              placeholder="Usuario"
              className="w-full border border-gray-300 rounded-md px-4 py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-[#00856F] focus:border-[#00856F] transition"
              value={usuario.usuario}
              onChange={atualizarEstado}
            />
          </div>

          {/* Foto - Upload Cloudinary */}
          <div className="flex flex-col w-full gap-2">
            <label htmlFor="foto">Foto</label>
            <input
              type="file"
              id="foto"
              name="foto"
              accept="image/*"
              className="w-full border border-gray-300 rounded-md px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[#00856F] transition cursor-pointer"
              onChange={handleFotoUpload}
            />
            {isUploadingFoto && (
              <div className="flex items-center gap-2 text-sm text-[#00856F]">
                <ClipLoader color="#00856F" size={16} />
                <span>Enviando foto...</span>
              </div>
            )}
            {usuario.foto && !isUploadingFoto && (
              <img
                src={usuario.foto}
                alt="Preview"
                className="w-24 h-24 rounded-full object-cover border-2 border-[#00856F] mx-auto"
              />
            )}
          </div>

          {/* Senha */}
          <div className="flex flex-col w-full">
            <label htmlFor="senha">Senha</label>
            <input
              type="password"
              id="senha"
              name="senha"
              placeholder="Senha"
              className="w-full border border-gray-300 rounded-md px-4 py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-[#00856F] focus:border-[#00856F] transition"
              value={usuario.senha}
              onChange={atualizarEstado}
            />
          </div>

          {/* Confirmar Senha */}
          <div className="flex flex-col w-full">
            <label htmlFor="confirmarSenha">Confirmar Senha</label>
            <input
              type="password"
              id="confirmarSenha"
              name="confirmarSenha"
              placeholder="Confirmar Senha"
              className="w-full border border-gray-300 rounded-md px-4 py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-[#00856F] focus:border-[#00856F] transition"
              value={confirmarSenha}
              onChange={handleConfirmarSenha}
            />
          </div>

          {/* Botões */}
          <div className="flex justify-around w-full gap-8">
            <button
              type="reset"
              className="w-full border-0 rounded-md px-4 py-2.5 text-white bg-gradient-to-br from-[#00A884] to-[#005F4F] focus:outline-none focus:ring-2 focus:ring-[#00856F] hover:opacity-80 transition hover:cursor-pointer"
              onClick={retornar}
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isUploadingFoto}
              className="w-full border-0 rounded-md px-2 py-2.5 text-white bg-gradient-to-br from-[#00A884] to-[#005F4F] focus:outline-none focus:ring-2 focus:ring-[#00856F] hover:opacity-80 transition hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
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
