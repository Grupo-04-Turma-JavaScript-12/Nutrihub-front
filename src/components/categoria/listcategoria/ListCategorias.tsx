import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SyncLoader } from "react-spinners";
import { AuthContext } from "../../../contexts/AuthContext";
import type Categoria from "../../../models/Categoria";
import { buscar } from "../../../services/Service";
import { ToastAlerta } from "../../../utils/ToastAlerta";
import CardCategoria from "../cardcategoria/CardCategoria";

function ListCategorias() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [categorias, setCategorias] = useState<Categoria[]>([]);

  const { restaurante, handleLogout } = useContext(AuthContext);
  const token = restaurante.token;

  useEffect(() => {
    if (token === "") {
      ToastAlerta("Você precisa estar logado!", "info");
      navigate("/");
    }
  }, [token]);

  useEffect(() => {
    buscarCategorias();
  }, [categorias.length]);

  async function buscarCategorias() {
    try {
      setIsLoading(true);

      await buscar("/categorias", setCategorias, {
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

  return (
    <section>
      {isLoading && (
        <div className="flex justify-center w-full my-8">
          <SyncLoader color="#312e81" size={32} />
        </div>
      )}

      <div className="md:container md:mx-auto md:py-4 p-4 flex flex-col gap-4 md:gap-0">
        {!isLoading && categorias.length === 0 && (
          <span className="text-3xl text-center my-8">
            Nenhum Tema foi encontrado!
          </span>
        )}

        {categorias.length !== 0 && (
          <div>
            <div className="md:grid md:grid-cols-3 md:px-4 font-semibold hidden">
              <p>Nome</p>
              <p>Descrição</p>
            </div>
            <div className="flex flex-col gap-2">
              {categorias.map((categoria) => (
                <CardCategoria key={categoria.id} categoria={categoria} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default ListCategorias;
