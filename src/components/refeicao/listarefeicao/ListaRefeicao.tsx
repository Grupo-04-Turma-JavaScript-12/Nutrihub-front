import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SyncLoader } from "react-spinners";
import { AuthContext } from "../../../contexts/AuthContext";
import type Categoria from "../../../models/Categoria";
import type Refeicao from "../../../models/Refeicao";
import { buscar } from "../../../services/Service";
import { ToastAlerta } from "../../../utils/ToastAlerta";
import Navbar from "../../navbar/Navbar";
import CardRefeicao from "../cardrefeicao/CardRefeicao";

function ListaRefeicao() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [refeicoes, setRefeicoes] = useState<Refeicao[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  useEffect(() => {
    if (token === "") {
      ToastAlerta("Você precisa estar logado!", "info");
      navigate("/");
    }
  }, [token]);

  useEffect(() => {
    buscarRefeicoes();
    buscarCategorias();
  }, [refeicoes.length]);

  async function buscarRefeicoes() {
    try {
      setIsLoading(true);

      await buscar("/refeicoes", setRefeicoes, {
        headers: { Authorization: token },
      });
    } catch (error: any) {
      if (error.toString().includes("401")) {
        handleLogout();
      }
    } finally {
      setIsLoading(false);
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

  return (
    <>
      {isLoading && (
        <div className="flex justify-center w-full my-8">
          <SyncLoader color="#312e81" size={32} />
        </div>
      )}
      <div className="min-h-screen bg-white">
        <Navbar />
        <main className="pb-20">
          <section className="mx-auto max-w-6xl px-6 pt-10">
            <div className="flex flex-col gap-8 md:flex-row md:items-start">
              <div className="shrink-0">
                <div className="h-40 w-40 overflow-hidden rounded-full bg-zinc-200">
                  <img
                    className="h-full w-full object-cover"
                    alt="Store"
                    src={usuario.foto}
                  />
                </div>
              </div>

              <div className="flex-1">
                <h1 className="text-3xl font-semibold text-zinc-800">
                  {usuario.nome}
                </h1>
              </div>
            </div>
          </section>
          <div className="mx-auto max-w-6xl px-6 pt-10">
            <div className="flex items-center justify-between">
              <div className="text-sm font-semibold text-zinc-700">
                Produtos
              </div>

              <Link
                to={`/cadastrarrefeicao`}
                className="rounded-full bg-emerald-700 px-4 py-2 text-[11px] font-semibold text-white hover:bg-emerald-800"
              >
                Nova Refeição
              </Link>
            </div>

            <div className="mt-4 h-px w-full bg-zinc-200" />
          </div>

          <div className="mx-auto mt-8 flex max-w-6xl flex-col gap-10 px-6 md:flex-row">
            <aside className="w-full md:w-64">
              <div className="rounded-xl bg-zinc-50 px-4 py-3">
                <div className="flex items-center gap-2 rounded-lg bg-white px-3 py-2 shadow-sm">
                  <span className="text-zinc-400">⌕</span>
                  <input
                    className="w-full bg-transparent text-sm outline-none placeholder:text-zinc-400"
                    placeholder="Pesquisar"
                  />
                </div>
              </div>

              <div className="mt-6">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-semibold text-zinc-800">
                    Categorias
                  </div>
                  <span className="text-zinc-400">⌄</span>
                </div>

                <div className="mt-3 space-y-2 text-sm text-zinc-600">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-zinc-300"
                    />
                    {categorias.map((categoria) => (
                      <span>{categoria.nome}</span>
                    ))}
                  </label>
                </div>
              </div>
            </aside>
            <section className="flex-1">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="text-sm text-zinc-500">
                  Veja todos os produtos ({refeicoes.length})
                </div>

                <div className="flex items-center gap-2 text-sm text-zinc-500">
                  <span>Ordene por:</span>
                  <button className="inline-flex items-center gap-2 rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-50">
                    Mais vendidos <span className="text-zinc-400">⌄</span>
                  </button>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {refeicoes.map((refeicao) => (
                  <CardRefeicao key={refeicao.id} refeicao={refeicao} />
                ))}
              </div>
            </section>
          </div>
        </main>
      </div>
    </>
  );
}

export default ListaRefeicao;
