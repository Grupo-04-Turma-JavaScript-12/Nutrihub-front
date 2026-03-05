/* eslint-disable @typescript-eslint/no-explicit-any */

import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { SyncLoader } from "react-spinners";
import { AuthContext } from "../../../contexts/AuthContext";
import type Categoria from "../../../models/Categoria";
import { buscar } from "../../../services/Service";
import CardCategoria from "../cardcategoria/CardCategoria"; 
import { ToastAlerta } from "../../../utils/ToastAlerta";

function ListaCategorias() {
  //constante navigate, que usa o hook useNavigate(). Com ela, consigo redirecionar o usuário para outras páginas da aplicação sempre que necessário
  const navigate = useNavigate();

  //Criei o estado isLoading, do tipo boolean, com valor inicial false, usando o hook useState
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [categorias, setCategorias] = useState<Categoria[]>([]);

  // Usei useContext(AuthContext) para acessar os valores do contexto, desestruturando o estado usuario e a função handleLogout fornecidos pelo provedor AuthProvider
  const { usuario, handleLogout } = useContext(AuthContext);

  //A constante token, que recebe o JWT do usuário autenticado. Esse token será enviado em requisições a endpoints protegidos, garantindo que apenas usuários autenticados acessem os recursos da aplicação.
  const token = usuario.token;

  //Usei o hook useEffect para monitorar mudanças no estado token do usuário.
  useEffect(() => {
    if (token === "") {
      ToastAlerta("Você precisa estar logado!", 'erro');
      navigate("/");
    }
  }, [token]);

  
  useEffect(() => {
    buscarCategorias();
  }, [categorias.length]);

  async function buscarCategorias() {
    //try/catch para tratar erros ao enviar a requisição GET para o backend
    try {
      // O estado isLoading, indica que o carregamento está em andamento.
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
    <>
      {isLoading && (
        <div className="flex justify-center w-full my-8">
          <SyncLoader color="gray" size={32} />
        </div>
      )}

      <div className="flex justify-center w-full my-4">
        <div className="container flex flex-col">
          {!isLoading && categorias.length === 0 && (
            <span className="text-3xl text-center my-8">
              Nenhuma Categoria foi encontrado!
            </span>
          )}

          <div
            className="grid grid-cols-1 md:grid-cols-2 
             lg:grid-cols-3 gap-8"
          >
            {categorias.map((categoria) => (
              <CardCategoria key={categoria.id} categoria={categoria} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
export default ListaCategorias;
