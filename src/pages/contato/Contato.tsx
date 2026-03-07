import { EnvelopeSimpleIcon } from "@phosphor-icons/react";
import fotoContato from "../../assets/imgcontato.png";

function Contato() {
  return (
    <div className="w-full bg-[#F7F9F9]">
      
      <section className="w-full px-6 py-16 sm:px-28">
        
        <div className="w-full max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-10">
          
          {/* Imagem */}
          <div className="w-5/6 sm:w-3/4 md:w-1/2 md:max-w-xl order-1 md:order-2">
            <img
              src={fotoContato}
              alt="Pessoa enviando mensagem pelo celular"
              className="rounded-2xl w-full shadow-xl"
            />
          </div>

          {/* Texto */}
          <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left order-2 md:order-1">
            
            <h2 className="text-3xl md:text-3xl font-bold mb-6 leading-tight">
              Entre em contato conosco
            </h2>

            <p className="flex items-center gap-3 bg-gray-300/20 px-5 py-3 rounded-xl text-lg">
              <EnvelopeSimpleIcon size={24} />
              contato@nutrihub.com.br
            </p>

          </div>

        </div>
      </section>
    </div>
  );
}

export default Contato;