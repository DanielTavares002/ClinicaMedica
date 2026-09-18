import * as repo from "../repositories/pacienteRepository.js";

export function obtemPacientePorId(id: number){
    const paciente = repo.buscaPacientePorId(id);
};