import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { AuthContext } from "../../../contexts/AuthContext";
import type Categoria from "../../../models/Categoria";
import { buscar, deletar } from "../../../services/Service";
import { ToastAlerta } from "../../../utils/ToastAlerta";
import ListCategorias from "../listcategoria/ListCategorias";

function DeletarCategoria() {
  const navigate = useNavigate();

  const [categoria, setCategoria] = useState<Categoria>({} as Categoria);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { restaurante, handleLogout } = useContext(AuthContext);
  const token = restaurante.token;

  const { id } = useParams<{ id: string }>();

  async function buscarPorId(id: string) {
    try {
      await buscar(`/categorias/${id}`, setCategoria, {
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

  async function deletarCategoria() {
    setIsLoading(true);

    try {
      await deletar(`/categorias/${id}`, {
        headers: {
          Authorization: token,
        },
      });

      ToastAlerta("Categoria apagada com sucesso", "sucesso");
    } catch (error: any) {
      if (error.toString().includes("401")) {
        handleLogout();
      } else {
        ToastAlerta("Erro ao deletar a categoria.", "erro");
      }
    }

    setIsLoading(false);
    retornar();
  }

  function retornar() {
    navigate("/categorias");
  }

  return (
    <section>
      <div className="pt-15">
        <h2 className="text-3xl font-bold text-center py-4 md:text-4xl">
          Categorias
        </h2>
      </div>
      <div className="md:container md:mx-auto md:py-4 p-4 flex flex-col gap-4 md:gap-0 border-t-[0.5px] border-gray-300">
        <div className="w-full flex flex-col gap-4 border border-gray-300 p-2 rounded-sm">
          <p className="text-center text-2xl md:text-3xl">Deletar categoria?</p>
          <div className="flex flex-col">
            <p className="font-semibold">Nome:</p>
            <p className="p-2 text-xl font-bold bg-[#00856f3f] rounded-sm">
              {categoria.nome}
            </p>
          </div>
          <div className="flex flex-col w-full">
            <p className="font-semibold">Descrição:</p>
            <p className="p-2 text-xl font-bold bg-[#00856f3f] rounded-sm">
              {categoria.descricao}
            </p>
          </div>
          <div className="flex justify-end md:justify-center gap-4 md:py-4">
            <button
              className="bg-[#00856F] rounded-2xl w-full text-white font-semibold py-2 md:w-[15vw] hover:cursor-pointer hover:bg-[#044d40] transition-all duration-300"
              onClick={deletarCategoria}
            >
              {isLoading ? (
                <ClipLoader color="#ffffff" size={24} />
              ) : (
                <span>Deletar Categoria</span>
              )}
            </button>
            <button
              className="bg-red-500 rounded-2xl w-full text-white font-semibold py-2 md:w-[15vw] hover:cursor-pointer hover:bg-red-700 transition-all duration-300"
              onClick={retornar}
            >
              Cancelar
            </button>
          </div>
        </div>
        <div className="md:grid md:grid-cols-3 md:px-4 text-gray-400 font-semibold hidden">
          <p className="md:hidden">Nome</p>
          <p className="md:hidden">Descrição</p>
        </div>
        <div className="flex flex-col gap-2">
          <ListCategorias />
        </div>
      </div>
    </section>
  );
}

export default DeletarCategoria;
