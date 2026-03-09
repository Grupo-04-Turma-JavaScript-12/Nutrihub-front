import CardPlano from "../cardplano/CardPlano";

function ListarPlanos() {
  const planos = [
    {
      id: 1,
      titulo: "Plano Essencial",
      preco: 149.0,
      descricao: "Plano básico com excelente custo e benefícios.",
      coberturas: [
        "Cadastro completo do restaurante",
        "Perfil com logo e descrição",
        "Gerenciamento de categorias",
        "Cardápio digital interativo",
        "Painel administrativo intuitivo",
      ],
      destaque: "bg-gray-200",
      destaque_texto: "text-slate-800",
      destaque_fundo: "bg-blue",
      destaque_botao: "bg-white",
      destaque_botao_hover: "hover:bg-[#355872]",
      destaque_svg: "bg-gray-200",
    },
    {
      id: 2,
      titulo: "Plano Profissional",
      preco: 249.0,
      descricao: "Plano intermediário com excelentes benefícios.",
      coberturas: [
        "Tudo do Plano Essencial",
        "Controle total de pratos e refeições",
        "Edição de preços e imagens",
        "Autenticação e login seguro",
        "Gestão organizada de produtos",
      ],
      destaque: "bg-[#00856F]",
      destaque_texto: "text-white",
      destaque_fundo: "bg-[#005e4e]",
      destaque_botao: "bg-[#005e4e]",
      destaque_botao_hover: "hover:bg-[#182a38]",
      destaque_svg: "bg-[#00856F]",
    },
    {
      id: 3,
      titulo: "Plano Premium",
      preco: 349.0,
      descricao: "Plano premium com excelentes benefícios.",
      coberturas: [
        "Tudo do Plano Profissional",
        "Segurança avançada de dados",
        "Acesso exclusivo multi-usuário",
        "Suporte para expansão de módulos",
        "Experiência VIP para o cliente",
      ],
      destaque: "bg-gray-200",
      destaque_texto: "text-slate-800",
      destaque_fundo: "bg-blue",
      destaque_botao: "bg-white",
      destaque_botao_hover: "hover:bg-[#355872]",
      destaque_svg: "bg-gray-200",
    },
  ];

  return (
    <section className="container mx-auto my-0 md:my-8">
      <div className="flex flex-col gap-6 p-4">
        <h2 className="text-4xl text-center font-bold">Planos</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {planos.map((plano) => (
            <CardPlano key={plano.id} plano={plano} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ListarPlanos;
