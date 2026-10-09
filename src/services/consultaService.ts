import * as repo from "../repositories/consultaRepository.js";
import type { Consulta } from "@prisma/client";
import type { ConsultaDTO } from "../types/consulta.js";

export async function obterConsultas(): Promise<Consulta[]> {
    return await repo.obterConsultas();
};

export async function obterConsultaPorId(id: number): Promise<Consulta | undefined> {
    return await repo.obterConsultaPorId(id);
};

export async function cadastrarConsulta(dados: ConsultaDTO): Promise<Consulta> {
    return await repo.cadastrarConsulta(dados);
};

export async function atualizarConsulta(id: number, dados: ConsultaDTO): Promise<Consulta> {
    return await repo.atualizarConsulta(id, dados);
};

export async function deletarConsulta(id: number) {
    return await repo.deletarConsulta(id);
};