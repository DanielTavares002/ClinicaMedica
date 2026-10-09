import { prisma } from "../config/prisma.js";
import type { ConsultaDTO } from "../types/consulta.js";

export async function obterConsultas() {
    return await prisma.consulta.findMany();
};

export async function obterConsultaPorId(id: number) {
    return await prisma.consulta.findUnique({ where: { id } });
};

export async function cadastrarConsulta(dados: ConsultaDTO) {
    return await prisma.consulta.create({ data: {
        idMedico: dados.idMedico!,
        idPaciente: dados.idPaciente!,
        dataConsulta: new Date(dados.dataConsulta!),
        motivoConsulta: dados.motivoConsulta!
    }
     });
};

export async function atualizarConsulta(id: number, dados: ConsultaDTO) {
    return await prisma.consulta.update({
        where: { id },
        data: {
            idMedico: dados.idMedico,
            idPaciente: dados.idPaciente,
            dataConsulta: dados.dataConsulta ? new Date(dados.dataConsulta) : undefined,
            motivoConsulta: dados.motivoConsulta
        }
    });
};

export async function deletarConsulta(id: number) {
    return await prisma.consulta.delete({ where: { id } });
};