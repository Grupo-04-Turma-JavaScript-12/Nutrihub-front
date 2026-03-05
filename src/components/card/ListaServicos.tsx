import CardLanding from "./CardServicos";


function ListarServicos() {
  const servicos = [
    {
      titulo: "Cadastro Completo do Restaurante",
      descricao: "Crie o perfil do seu negócio com logo, descrição e informações personalizadas.",
    },
    {
      titulo: "Gerenciamento de Categorias",
      descricao: "Organize seus produtos por categorias e facilite a navegação do cliente.",
    },
    {
      titulo: "Controle de Pratos e Refeições",
      descricao: "Adicione, edite e atualize nome, descrição, preço e imagem dos seus pratos.",
    },
    {
      titulo: "Cardápio Digital Interativo",
      descricao: "Ofereça uma experiência moderna e acessível para seus clientes.",
    },
    {
      titulo: "Autenticação e Segurança",
      descricao: "Sistema de login seguro com controle de acesso exclusivo.",
    },
    {
      titulo: "Painel Administrativo Exclusivo",
      descricao: "Gerencie seu restaurante com autonomia total em um ambiente intuitivo.",
    },

  ];

  return (
    <section className="container mx-auto">
      <div className="flex flex-col gap-6 p-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {servicos.map((card) => (
            <CardLanding key={card.titulo} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ListarServicos;
