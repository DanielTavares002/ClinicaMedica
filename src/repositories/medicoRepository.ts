import type { Medico } from "../types/medicoInterface.js";
import type { MedicoDTO } from "../types/medicoDTOInterface.js";

const medicos: Medico[] = [];
    medicos.push(
        {id: 1, nome: "Heitor", telefone: "83956841256", crm: "CF5645", especialidade: "Neurologista"},
        {id: 2, nome: "Ana", telefone: "83914523256", crm: "CFT452", especialidade: "Cardiologista"}
    );

export async function obterMedicos() : Promise<Medico[]> {
    return medicos;
};

export async function obterMedicoPorId(id: number) : Promise<Medico | undefined>{
  
    return medicos.find((medico) => medico.id === id);
};

export async function cadastrarMedico(dados: MedicoDTO) {
    const { nome, telefone, crm, especialidade } = dados;
    const ultimoId = medicos[medicos.length - 1].id;

    const novoMedico: Medico = {
        id: ultimoId + 1,
        nome,
        telefone,
        crm,
        especialidade
    };

    medicos.push(novoMedico);
    return novoMedico;
};

export async function atualizarMedico(id: number, dados: MedicoDTO) : Promise<Medico | undefined> {
    const medicoEncontrado: Medico | undefined = medicos.find((medico) => medico.id === id);
    if(!medicoEncontrado) return;

    const { nome, telefone, crm, especialidade } = dados;

    medicoEncontrado.nome = nome;
    medicoEncontrado.telefone = telefone;
    medicoEncontrado.crm = crm;
    medicoEncontrado.especialidade = especialidade;

    return(medicoEncontrado);
};

export async function deletarMedico(id: number) : Promise<Medico | undefined>{
    const indice = medicos.findIndex( medico => medico.id === id);
    if (indice === -1) return;

    const medicoRemovido = medicos[indice];
    medicos.splice(indice, 1);

    return medicoRemovido;
};