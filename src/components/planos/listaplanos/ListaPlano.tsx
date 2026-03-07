import CardPlano from "../cardplano/CardPlano";

function ListarPlanos() {
  const planos = [
    {
      id: 1,
      titulo: "Plano Essencial",
      preco: 149.0,
      descricao: "Plano básico com excelente custo e benefícios.",
      coberturas: [
        "Cadastro completo de colaboradores",
        "Consulta por ID e cargo",
        "Atualização de informações",
        "Exclusão segura de registros",
        "Banco de dados confiável",
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
        "Gestão organizada por cargos",
        "Controle estruturado de admissões",
        "Atualizações rápidas e centralizadas",
        "Sistema preparado para expansão",
        "Interface moderna e intuitiva",
      ],
      destaque: "bg-[#7AAACE]",
      destaque_texto: "text-white",
      destaque_fundo: "bg-[#355872]",
      destaque_botao: "bg-[#355872]",
      destaque_botao_hover: "hover:bg-[#182a38]",
      destaque_svg: "bg-[#7AAACE]",
    },
    {
      id: 3,
      titulo: "Plano Premium",
      preco: 349.0,
      descricao: "Plano premium com excelentes benefícios.",
      coberturas: [
        "Estrutura segura e escalável",
        "Banco de dados relacional com integridade garantida",
        "Organização estratégica de colaboradores",
        "Alta confiabilidade nas informações",
        "Preparado para integração futura com novos módulos",
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
