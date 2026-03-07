import CardEquipe from "../cardequipe/CardEquipe";

function ListaEquipe() {

  const equipe = [
    {
      name: "Alberto Durán",
      cargo: "Tech Lead",
      image: "https://avatars.githubusercontent.com/u/67593467?v=4",
      linkedin: "https://www.linkedin.com/in/alberto-janeiro",
      github: "https://github.com/AlbertoDuranFilho",
    },
    {
      name: "André César",
      cargo: "Tech Lead",
      image: "https://avatars.githubusercontent.com/u/216065214?v=4",
      linkedin: "https://www.linkedin.com/in/andrecesar-dev/",
      github: "https://github.com/andrecesarhdev",
    },
    {
      name: "Bruna Melo",
      cargo: "Tech Lead",
      image: "https://avatars.githubusercontent.com/u/226072233?v=4",
      linkedin: "https://www.linkedin.com/in/bruna-melo-9335381b3/",
      github: "https://github.com/bkmelo",
    },
    {
      name: "Giovanna Roberta",
      cargo: "Tech Lead",
      image: "https://avatars.githubusercontent.com/u/102972472?v=4",
      linkedin: "https://www.linkedin.com/in/giovannaroberta/",
      github: "https://github.com/gioroberta",
    },
    {
      name: "Jacqueline Cardeal",
      cargo: "Tech Lead",
      image: "https://avatars.githubusercontent.com/u/141357140?v=4",
      linkedin: "https://www.linkedin.com/in/jacqueline-cardeal/",
      github: "https://github.com/jackmarques",
    },
    {
      name: "Renato Sales",
      cargo: "Tech Lead",
      image: "https://avatars.githubusercontent.com/u/101156709?v=4",
      linkedin: "https://www.linkedin.com/in/renato-sales-desenvolvedor/",
      github: "https://github.com/renato-sales",
    },
  ];

  return (
    <>
      <h1 className="text-center text-3xl font-bold mb-12 pt-10">Conheça Nossa <span className="block md:inline">Equipe</span></h1>
      <div className="bg-gray-50 px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-6xl mx-auto md:pb-8">
          {equipe.map((membro) => (
            <CardEquipe key={membro.name} membro={membro} />
          ))}
        </div>
      </div>
    </>
  );
}


export default ListaEquipe;
