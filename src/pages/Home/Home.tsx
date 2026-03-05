import logo from "../../assets/mulherlegumes.png"

function Home() {
  return (
    <section className="bg-[#DCE9E2] w-full pt-24 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-6 pt-8 grid grid-cols-1 sm:px-30 sm:pt-0 md:grid-cols-2 items-center gap-10 text-black">
        
        <div className="flex flex-col gap-6 text-center md:text-left">
          <p>Bem Vindo à Nutrihub</p>

          <h2 className="text-3xl md:text-5xl font-bold leading-tight">
            Nutrição inteligente e conveniente para você!
          </h2>

          <p className="text-lg md:text-xl">
            Cardápios personalizados e refeições saudáveis para uma rotina mais prática e equilibrada.
          </p>
        </div>

        <div className="flex justify-center">
          <img 
            src={logo} 
            alt="Logo da Nutrihub"
            className="max-w-md md:max-w-3xl"
          />
        </div>

      </div>
    </section>
  )
}

export default Home