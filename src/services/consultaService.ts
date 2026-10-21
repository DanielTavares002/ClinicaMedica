import * as consultaRepository from "../repositories/consultaRepository.js";
import * as medicoService from "./medicoService.js";
import * as pacienteService from "./pacienteService.js";
import type { Consulta } from "@prisma/client";
import type { ConsultaDTO } from "../types/consulta.js";

// Regra de Negócio: Limite máximo de pacientes atendidos por turno
const LIMITE_CONSULTAS_POR_TURNO = 5;

// Função para centralizar as regras de negócio
async function validarRegrasDeNegocio(dados: ConsultaDTO, consultaIdIgnorar?: number) {
  // 1. Validar existência do Médico via medicoService
  const medico = await medicoService.encontrarUmMedico(Number(dados.medicoId));
  if (!medico) {
    throw new Error(`Médico com ID ${dados.medicoId} não encontrado.`);
  }

  // 2. Validar existência do Paciente via pacienteService
  const paciente = await pacienteService.encontrarUmPaciente(dados.pacienteId);
  if (!paciente) {
    throw new Error(`Paciente com ID ${dados.pacienteId} não encontrado.`);
  }

  // 3. Regra de Negócio: O mesmo paciente não pode marcar duas consultas no mesmo turno e data
  const consultaExistentePaciente =
    await consultaRepository.findByPacienteDataTurno(
      dados.pacienteId,
      dados.data,
      dados.turno,
      consultaIdIgnorar, // Se for update, passa o ID para ignorar
    );

  if (consultaExistentePaciente) {
    throw new Error(
      `O paciente ${paciente.nome} já possui uma consulta marcada para o turno ${dados.turno} no dia ${dados.data}.`,
    );
  }

  // 4. Regra de Negócio: Limite de 5 pacientes por turno para o médico
  const totalConsultasNoTurno =
    await consultaRepository.countByMedicoDataTurno(
      dados.medicoId,
      dados.data,
      dados.turno,
      consultaIdIgnorar, // Se for update, passa o ID para ignorar
    );

  if (totalConsultasNoTurno >= LIMITE_CONSULTAS_POR_TURNO) {
    throw new Error(
      `O médico Dr(a). ${medico.nome} já atingiu o limite de ${LIMITE_CONSULTAS_POR_TURNO} pacientes para o turno ${dados.turno} no dia ${dados.data}.`,
    );
  }
}

export async function listarConsultas(): Promise<Consulta[]> {
  return await consultaRepository.findAll();
}

export async function encontrarUmaConsulta(
  id: number,
): Promise<Consulta | null> {
  return await consultaRepository.findById(id);
}

export async function criarConsulta(
  dados: ConsultaDTO,
): Promise<Consulta> {
  await validarRegrasDeNegocio(dados);

  return await consultaRepository.create(dados);
}

export async function atualizarConsulta(
  id: number,
  dados: ConsultaDTO,
): Promise<Consulta> {
  // 1. Validar se a consulta realmente existe
  const existente = await consultaRepository.findById(id);
  if (!existente) {
    throw new Error("Consulta não encontrada.");
  }

  await validarRegrasDeNegocio(dados, id);

  return await consultaRepository.update(id, dados);
}

export async function deletarConsulta(
  id: number
): Promise<void> {
  const existente = await consultaRepository.findById(id);
  if (!existente) {
    throw new Error("Consulta não encontrada.");
  }

  await consultaRepository.remove(id);
}
