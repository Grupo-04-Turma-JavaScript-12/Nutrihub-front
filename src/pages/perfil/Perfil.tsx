import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { ToastAlerta } from "../../utils/ToastAlerta";

function Perfil() {
  const navigate = useNavigate();
  const { restaurante } = useContext(AuthContext);

  useEffect(() => {
    if (restaurante.token === "") {
      ToastAlerta("Você precisa estar logado!", "erro");
      navigate("/");
    }
  }, [restaurante.token]);

  const estatisticas = {
    pratos: 12,
    categorias: 4,
    avaliacoes: 38,
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#B4B4B4]">
      <div className="bg-white w-130 rounded-2xl shadow-2xl overflow-hidden">
        <div className="bg-[#00856F] h-28"></div>

        <div className="flex flex-col items-center -mt-14 px-8 pb-8">
          <img
            className="w-28 h-28 rounded-full border-4 border-white object-cover shadow-md"
            src={restaurante.foto}
            alt="Foto do restaurante"
          />

          <h2 className="text-2xl font-bold mt-4 text-[#00856F]">
            {restaurante.nome}
          </h2>

          <p className="text-[#B4B4B4]">{restaurante.usuario}</p>

          <div className="border-t w-full mt-6 pt-6 flex justify-around text-center">
            <div>
              <p className="text-2xl font-bold text-[#00856F]">
                {estatisticas.pratos}
              </p>
              <p className="text-[#B4B4B4]">Pratos</p>
            </div>

            <div>
              <p className="text-2xl font-bold text-[#00856F]">
                {estatisticas.categorias}
              </p>
              <p className="text-[#B4B4B4]">Categorias</p>
            </div>

            <div>
              <p className="text-2xl font-bold text-[#00856F]">
                {estatisticas.avaliacoes}
              </p>
              <p className="text-[#B4B4B4]">Avaliações</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Perfil;
