import { XCircleIcon } from "@phosphor-icons/react";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { AuthContext } from "../../../contexts/AuthContext";
import type Refeicao from "../../../models/Refeicao";
import { buscar, deletar } from "../../../services/Service";
import { ToastAlerta } from "../../../utils/ToastAlerta";

function DeletarRefeicao() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [refeicao, setRefeicao] = useState<Refeicao>({} as Refeicao);

  const { id } = useParams<{ id: string }>();

  const { restaurante, handleLogout } = useContext(AuthContext);
  const token = restaurante.token;

  async function buscarPorId(id: string) {
    try {
      await buscar(`/refeicoes/${id}`, setRefeicao, {
        headers: {
          Authorization: token,
        },
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
    if (id !== undefined) {
      buscarPorId(id);
    }
  }, [id]);

  async function deletarRefeicao() {
    setIsLoading(true);

    try {
      await deletar(`/refeicoes/${id}`, {
        headers: {
          Authorization: token,
        },
      });

      ToastAlerta("Refeição apagada com sucesso", "sucesso");
    } catch (error: any) {
      if (error.toString().includes("401")) {
        handleLogout();
      } else {
        ToastAlerta("Erro ao deletar a refeição.", "erro");
      }
    }

    setIsLoading(false);
    retornar();
  }

  function retornar() {
    navigate("/refeicoes");
  }

  return (
    /* Container que ocupa a tela toda e centraliza o conteúdo */
    <div className="min-h-screen flex items-center justify-center bg-zinc-900/40 p-4 sm:p-6">
      <div className="w-full max-w-md rounded-2xl bg-zinc-50 p-6 sm:p-8 shadow-xl animate-fade-in">
        <div className="flex flex-col items-center text-center">
          {/* Ícone responsivo */}
          <div className="mb-5 text-rose-500">
            <XCircleIcon size={64} className="sm:w-20 sm:h-20" weight="light" />
          </div>

          <h1 className="mb-2 text-xl sm:text-2xl font-bold text-zinc-800">
            Deletar Refeição
          </h1>

          <p className="mb-6 text-zinc-500 text-sm sm:text-base">
            Tem certeza que você deseja excluir a refeição{" "}
            <span className="font-semibold text-zinc-700 block sm:inline">
              "{refeicao.nome}"
            </span>
            ?
          </p>

          {/* Box de informações adaptável */}
          <div className="mb-8 w-full rounded-xl border border-zinc-200 bg-white p-4 text-left space-y-3 shadow-sm">
            {refeicao.foto && (
              <img
                src={refeicao.foto}
                alt={refeicao.nome}
                className="w-full h-32 sm:h-40 object-cover rounded-lg"
              />
            )}

            <div className="grid grid-cols-1 gap-2">
              <div>
                <p className="text-[10px] sm:text-[11px] uppercase tracking-wider text-zinc-400 font-bold">
                  Nome
                </p>
                <p className="text-sm text-zinc-700 font-semibold truncate">
                  {refeicao.nome}
                </p>
              </div>
              <div>
                <p className="text-[10px] sm:text-[11px] uppercase tracking-wider text-zinc-400 font-bold">
                  Descrição
                </p>
                <p className="text-xs sm:text-sm text-zinc-600 line-clamp-2">
                  {refeicao.descricao}
                </p>
              </div>
              <div>
                <p className="text-[10px] sm:text-[11px] uppercase tracking-wider text-zinc-400 font-bold">
                  Preço
                </p>
                <p className="text-sm font-bold text-zinc-800">
                  R$ {refeicao.preco}
                </p>
              </div>
            </div>
          </div>

          {/* Botões: Lado a lado no mobile e desktop */}
          <div className="flex w-full gap-3">
            <button
              className="flex-1 rounded-xl bg-zinc-200 py-3 text-sm sm:text-base font-bold text-zinc-600 hover:bg-zinc-300 transition-all active:scale-95 hover:cursor-pointer"
              onClick={retornar}
            >
              Cancelar
            </button>
            <button
              className="flex flex-1 items-center justify-center rounded-xl bg-rose-500 py-3 text-sm sm:text-base font-bold text-white hover:bg-rose-600 transition-all active:scale-95 disabled:opacity-70 hover:cursor-pointer"
              onClick={deletarRefeicao}
              disabled={isLoading}
            >
              {isLoading ? (
                <ClipLoader size={20} color="#fff" />
              ) : (
                "Sim, deletar"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeletarRefeicao;
