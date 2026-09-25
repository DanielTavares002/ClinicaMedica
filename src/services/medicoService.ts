import * as repo from "../repositories/medicoRepository.js";
import type { Medico } from "../interfaces/medicoInterface.js";
import type { MedicoDTO } from "../interfaces/medicoDTOInterface.js";

export async function obterMedicos(): Promise<Medico[]> {
    return await repo.obterMedicos();
};

export async function obterMedicoPorId(id: number): Promise<Medico | undefined>{
   return await repo.obterMedicoPorId(id);
};

export async function criarMedico(novoMedico: MedicoDTO){

};

export async function alterarMedico(id: number){

};

export async function deletarMedico(id: number){

};