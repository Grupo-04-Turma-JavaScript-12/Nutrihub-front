import { GithubLogoIcon, LinkedinLogoIcon } from "@phosphor-icons/react";

interface CardEquipeProps {
    membro: {
        name: string;
        cargo: string;
        image: string;
        github: string;
        linkedin: string;
    };
}

function CardEquipe({ membro }: CardEquipeProps) {
    return (
        <>
                <div className="border border-slate-200 rounded-lg shadow-sm md:pt-4">
                    <img
                        src={membro.image}
                        alt="Foto do membro da equipe"
                        className="w-full h-auto rounded-full mx-auto sm:w-52 p-4 md:p-0" />
                    <div className="p-4 w-full h-auto">
                        <div>
                            <p className="font-bold">{membro.name}</p>
                            <p className="mb-2 text-[#00856F] font-bold text-sm">{membro.cargo}</p>
                        </div>
                        <div className="w-full h-auto flex flex-col md:flex-row gap-4 pt-4 text-[#00856F] font-bold">
                            <a href={membro.linkedin}
                                target="_black" className="flex flex-1 gap-1 items-center justify-center bg-[#DCE9E2] rounded p-2">
                                <LinkedinLogoIcon
                                size={28}
                                weight="bold" />
                                LinkedIn
                            </a>
                            <a href={membro.github}
                                target="_black" className="flex flex-1 gap-1 items-center justify-center bg-[#DCE9E2] rounded p-2">
                                <GithubLogoIcon size={28} weight="bold" />
                                GitHub
                            </a>
                        </div>
                    </div>
                </div>
        </>
    );
}

export default CardEquipe;
