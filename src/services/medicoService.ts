import * as repo from "../repositories/medicoRepository.js";
import type { Medico } from "../types/medicoInterface.js";
import type { MedicoDTO } from "../types/medicoDTOInterface.js";

export async function obterMedicos(): Promise<Medico[]> {
    return await repo.obterMedicos();
};

export async function obterMedicoPorId(id: number) : Promise<Medico | undefined> {
    return await repo.obterMedicoPorId(id);
};

export async function cadastrarMedico(dados: MedicoDTO) : Promise<Medico> {
    return await repo.cadastrarMedico(dados);
};

export async function atualizarMedico(id: number, dados: MedicoDTO) {
    return await repo.atualizarMedico(id, dados);
};

export async function deletarMedico(id: number){
    return await repo.deletarMedico(id);
};