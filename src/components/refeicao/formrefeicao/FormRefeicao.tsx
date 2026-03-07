import {
  useContext,
  useEffect,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { AuthContext } from "../../../contexts/AuthContext";
import type Categoria from "../../../models/Categoria";
import type Refeicao from "../../../models/Refeicao";
import { atualizar, buscar, cadastrar } from "../../../services/Service";
import { ToastAlerta } from "../../../utils/ToastAlerta";

function FormRefeicao() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [isUploadingFoto, setIsUploadingFoto] = useState<boolean>(false);
  const UPLOAD_PRESET = import.meta.env.VITE_UPLOAD_PRESET;
  const CLOUD_NAME = import.meta.env.VITE_CLOUD_NAME_CLOUDINARY;

  console.log(CLOUD_NAME);
  console.log(UPLOAD_PRESET);

  const [categorias, setCategorias] = useState<Categoria[]>([]);

  const [categoria, setCategoria] = useState<Categoria>({
    id: 0,
    nome: "",
    descricao: "",
  });

  const [refeicao, setRefeicao] = useState<Refeicao>({} as Refeicao);

  const { restaurante, handleLogout } = useContext(AuthContext);
  const token = restaurante.token;

  const { id } = useParams<{ id: string }>();

  async function handleFotoUpload(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingFoto(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        { method: "POST", body: formData }
      );
      const data = await res.json();
      setRefeicao((prev) => ({
        ...prev,
        foto: data.secure_url,
        categoria: categoria,
        restaurante: restaurante,
      }));
    } catch {
      ToastAlerta("Erro ao fazer upload da imagem", "erro");
    } finally {
      setIsUploadingFoto(false);
    }
  }

  async function buscarRefeicaoPorId(id: string) {
    try {
      await buscar(`/refeicoes/${id}`, setRefeicao, {
        headers: { Authorization: token },
      });
    } catch (error: any) {
      if (error.toString().includes("401")) {
        handleLogout();
      }
    }
  }

  async function buscarcategoriaPorId(id: string) {
    try {
      await buscar(`/categorias/${id}`, setCategoria, {
        headers: { Authorization: token },
      });
    } catch (error: any) {
      if (error.toString().includes("401")) {
        handleLogout();
      }
    }
  }

  async function buscarCategorias() {
    try {
      await buscar("/categorias", setCategorias, {
        headers: { Authorization: token },
      });
    } catch (error: any) {
      if (error.toString().includes("401")) {
        handleLogout();
      }
    }
  }

  useEffect(() => {
    if (token === "") {
      ToastAlerta("Você precisa estar logado", "info");
      navigate("/");
    }
  }, [token]);

  useEffect(() => {
    buscarCategorias();

    if (id !== undefined) {
      buscarRefeicaoPorId(id);
    }
  }, [id]);

  useEffect(() => {
    setRefeicao({
      ...refeicao,
      categoria: categoria,
    });
  }, [categoria]);

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    const value =
      e.target.name === "preco" ? Number(e.target.value) : e.target.value;
    setRefeicao({
      ...refeicao,
      [e.target.name]: value,
      categoria: categoria,
      restaurante: restaurante,
    });
  }

  function retornar() {
    navigate("/refeicoes");
  }

  async function gerarNovaRefeicao(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    console.log(token);

    if (id !== undefined) {
      try {
        await atualizar(`/refeicoes`, refeicao, setRefeicao, {
          headers: {
            Authorization: token,
          },
        });

        ToastAlerta("Refeição atualizada com sucesso", "sucesso");
      } catch (error: any) {
        if (error.toString().includes("401")) {
          handleLogout();
        } else {
          ToastAlerta("Erro ao atualizar a Refeição", "erro");
        }
      }
    } else {
      try {
        await cadastrar(`/refeicoes`, refeicao, setRefeicao, {
          headers: {
            Authorization: token,
          },
        });

        ToastAlerta("Refeição cadastrada com sucesso", "sucesso");
      } catch (error: any) {
        if (error.toString().includes("401")) {
          handleLogout();
        } else {
          ToastAlerta("Erro ao cadastrar a Refeição", "erro");
        }
      }
    }

    setIsLoading(false);
    retornar();
  }

  const carregandoCategoria = categoria.descricao === "";

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-900/40 p-4 sm:p-6 pt-20 md:pt-20">
      <div className="w-full max-w-lg rounded-2xl bg-zinc-50 p-6 sm:p-8 shadow-xl">
        {/* Cabeçalho */}
        <div className="flex flex-col items-center text-center mb-6">
          <h1 className="text-xl sm:text-2xl font-bold text-zinc-800">
            {id !== undefined ? "Editar Refeição" : "Cadastrar Refeição"}
          </h1>
          <p className="text-sm text-zinc-500 mt-1">
            {id !== undefined
              ? "Atualize as informações da refeição abaixo"
              : "Preencha os campos para cadastrar uma nova refeição"}
          </p>
        </div>

        <form className="flex flex-col gap-4" onSubmit={gerarNovaRefeicao}>
          {/* Nome */}
          <div className="flex flex-col gap-1">
            <label
              htmlFor="nome"
              className="text-xs font-bold uppercase tracking-wider text-zinc-400"
            >
              Nome da Refeição
            </label>
            <input
              type="text"
              placeholder="Ex: Marmita de frango grelhado"
              name="nome"
              id="nome"
              required
              className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-800 shadow-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition"
              value={refeicao.nome}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                atualizarEstado(e)
              }
            />
          </div>

          {/* Descrição */}
          <div className="flex flex-col gap-1">
            <label
              htmlFor="descricao"
              className="text-xs font-bold uppercase tracking-wider text-zinc-400"
            >
              Descrição
            </label>
            <input
              type="text"
              placeholder="Ex: Marmita saudável com arroz e legumes"
              name="descricao"
              id="descricao"
              required
              className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-800 shadow-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition"
              value={refeicao.descricao}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                atualizarEstado(e)
              }
            />
          </div>

          {/* Foto */}
          <div className="flex flex-col gap-1">
            <label
              htmlFor="foto"
              className="text-xs font-bold uppercase tracking-wider text-zinc-400"
            >
              Foto da Refeição
            </label>
            <input
              type="file"
              accept="image/*"
              id="foto"
              name="foto"
              className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-sm text-zinc-500 shadow-sm
                         file:mr-3 file:rounded-lg file:border-0 file:bg-indigo-50 file:px-3 file:py-1
                         file:text-xs file:font-semibold file:text-indigo-700 hover:file:bg-indigo-100 transition"
              onChange={handleFotoUpload}
            />
            {isUploadingFoto && (
              <p className="text-xs text-zinc-400 flex items-center gap-2 mt-1">
                <ClipLoader size={12} color="#6366f1" /> Enviando imagem...
              </p>
            )}
            {refeicao.foto && !isUploadingFoto && (
              <img
                src={refeicao.foto}
                alt="Preview"
                className="mt-2 h-36 w-full object-cover rounded-xl border border-zinc-200 shadow-sm"
              />
            )}
          </div>

          {/* Preço */}
          <div className="flex flex-col gap-1">
            <label
              htmlFor="preco"
              className="text-xs font-bold uppercase tracking-wider text-zinc-400"
            >
              Preço (R$)
            </label>
            <input
              type="number"
              placeholder="Ex: 29.90"
              name="preco"
              id="preco"
              required
              step="0.01"
              min="0"
              className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-800 shadow-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition"
              value={refeicao.preco ?? ""}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                atualizarEstado(e)
              }
            />
          </div>

          {/* Categoria */}
          <div className="flex flex-col gap-1">
            <label
              htmlFor="categoria"
              className="text-xs font-bold uppercase tracking-wider text-zinc-400"
            >
              Categoria
            </label>
            <select
              name="categoria"
              id="categoria"
              className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-800 shadow-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition"
              onChange={(e) => buscarcategoriaPorId(e.currentTarget.value)}
            >
              <option value="" selected disabled>
                Selecione uma categoria
              </option>
              {categorias.map((categoria) => (
                <option key={categoria.id} value={categoria.id}>
                  {categoria.nome}
                </option>
              ))}
            </select>
          </div>

          {/* Botões */}
          <div className="flex gap-3 mt-2">
            <button
              type="button"
              className="flex-1 rounded-xl bg-zinc-200 py-3 text-sm font-bold text-zinc-600 hover:bg-zinc-300 transition-all active:scale-95"
              onClick={retornar}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex flex-1 items-center justify-center rounded-xl bg-indigo-500 py-3 text-sm font-bold text-white hover:bg-indigo-700 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={carregandoCategoria}
            >
              {isLoading ? (
                <ClipLoader color="#ffffff" size={20} />
              ) : (
                <span>{id === undefined ? "Cadastrar" : "Atualizar"}</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FormRefeicao;
