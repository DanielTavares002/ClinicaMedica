import { prisma } from "../config/prisma.js";
import type { PacienteDTO } from "../types/paciente.js"

export async function buscaPacientePorId(id: number) {
    return await prisma.paciente.findUnique({ where: { id } });
}

export async function cadastrarPaciente(dadosPaciente: PacienteDTO) {
    return await prisma.paciente.create({ data: dadosPaciente });
}