import { useContext, useEffect, useState, type ChangeEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { AuthContext } from "../../../contexts/AuthContext";
import type Categoria from "../../../models/Categoria";
import { atualizar, buscar, cadastrar } from "../../../services/Service";
import { ToastAlerta } from "../../../utils/ToastAlerta";
import ListCategorias from "../listcategoria/ListCategorias";

function FormCategoria() {
  const navigate = useNavigate();

  const [categoria, setCategoria] = useState<Categoria>({} as Categoria);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { restaurante, handleLogout } = useContext(AuthContext);
  const token = restaurante.token;

  const { id } = useParams<{ id: string }>();

  async function buscarPorId(id: string) {
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

  useEffect(() => {
    if (token === "") {
      ToastAlerta("Você precisa estar logado!", "info");
      navigate("/");
    }
  }, [token]);

  useEffect(() => {
    if (id !== undefined) {
      buscarPorId(id);
    }
  }, [id]);

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setCategoria({
      ...categoria,
      [e.target.name]: e.target.value,
    });
  }

  function retornar() {
    navigate("/categorias");
  }

  async function gerarNovaCategoria(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    if (id !== undefined) {
      try {
        await atualizar(`/categorias`, categoria, setCategoria, {
          headers: { Authorization: token },
        });
        ToastAlerta("A categoria foi atualizada com sucesso!", "sucesso");
      } catch (error: any) {
        if (error.toString().includes("401")) {
          handleLogout();
        } else {
          ToastAlerta("Erro ao atualizar a categoria.", "erro");
        }
      }
    } else {
      try {
        await cadastrar(`/categorias`, categoria, setCategoria, {
          headers: { Authorization: token },
        });
        ToastAlerta("A categoria foi cadastrada com sucesso!", "sucesso");
      } catch (error: any) {
        if (error.toString().includes("401")) {
          handleLogout();
        } else {
          ToastAlerta("Erro ao cadastrar a categoria.", "erro");
        }
      }
    }

    setIsLoading(false);
    retornar();
  }

  return (
    <section>
      <div className="pt-15">
        <h1 className="text-4xl font-bold text-center py-4 md:text-4xl">
          Categorias
        </h1>
      </div>
      <div className="md:container md:mx-auto md:py-4 p-4 flex flex-col gap-4 md:gap-0 border-t-[0.5px] border-gray-300">
        <h2 className="text-3xl text-center">
          {id === undefined ? "Cadastrar Categoria" : "Editar Categoria"}
        </h2>
        <form
          className="w-full flex flex-col gap-4"
          onSubmit={gerarNovaCategoria}
        >
          <div className="flex flex-col">
            <label htmlFor="nome" className="font-semibold">
              Nome:
            </label>
            <input
              type="text"
              placeholder="Digite o nome da categoria"
              name="nome"
              id="nome"
              className="border-2 border-slate-700 rounded p-2"
              value={categoria.nome}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                atualizarEstado(e)
              }
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="descricao" className="font-semibold">
              Descrição:
            </label>
            <input
              type="text"
              placeholder="Descrição da sua categoria"
              name="descricao"
              id="descricao"
              className="border-2 border-slate-700 rounded p-2"
              value={categoria.descricao}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                atualizarEstado(e)
              }
            />
          </div>
          <div className="flex justify-end md:justify-center gap-4 md:py-4">
            <button className="bg-[#00856F] rounded-2xl w-full text-white font-semibold py-2 md:w-[15vw] hover:cursor-pointer hover:bg-[#044d40] transition-all duration-300">
              {isLoading ? (
                <ClipLoader color="#ffffff" size={24} />
              ) : (
                <span>
                  {id === undefined
                    ? "Cadastrar categoria"
                    : "Atualizar categoria"}
                </span>
              )}
            </button>
          </div>
        </form>
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

export default FormCategoria;
