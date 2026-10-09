import * as repo from "../repositories/pacienteRepository.js";
import type { Paciente } from "../generated/prisma/client.js";
import type { PacienteDTO } from "../types/paciente.js"

export function obterPacientes(){

};

export async function obterPacientePorId(id: number){
    const paciente: Paciente | null = await repo.buscaPacientePorId(id);
    if (!paciente) throw new Error("Paciente não encontrado");
    return paciente;
};

export async function cadastrarPaciente(dadosPaciente: PacienteDTO){
    return await repo.cadastrarPaciente(dadosPaciente);
};

export function atualizarPaciente(id: number){

};

export function deletarPaciente(id: number){

};