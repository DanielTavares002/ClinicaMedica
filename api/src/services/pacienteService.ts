import * as pacienteRepository from "../repositories/pacienteRepository.js";
import type { Paciente } from "@prisma/client";
import type { PacienteInput } from "@clinica/shared/paciente";

export async function listarPacientes(): Promise<Paciente[]> {
  return await pacienteRepository.findAll();
}

export async function encontrarUmPaciente(id: number): Promise<Paciente | null> {
  return await pacienteRepository.findById(id);
}

export async function criarPaciente(dados: PacienteInput): Promise<Paciente> {
  const existente = await pacienteRepository.findByCpf(dados.cpf);
  if (existente) {
    throw new Error("Já existe um paciente cadastrado com este CPF.");
  }
  return await pacienteRepository.create(dados);
}

export async function atualizarPaciente(
  id: number,
  dados: PacienteInput,
): Promise<Paciente> {
  // O CPF pode ser o do próprio paciente; só é erro se for de outro
  const existente = await pacienteRepository.findByCpf(dados.cpf);
  if (existente && existente.id !== id) {
    throw new Error("Já existe um paciente cadastrado com este CPF.");
  }
  return await pacienteRepository.update(id, dados);
}

export async function deletarPaciente(id: number): Promise<void> {
  await pacienteRepository.remove(id);
}
