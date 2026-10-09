import type { Request, Response } from "express";
import * as service from "../services/pacienteService.js";
import type { PacienteDTO } from "../types/paciente.js"

export async function obterPacientes(req: Request, res: Response){
    
};

export async function obterPacientePorId(req: Request, res: Response){
    const id: number = Number(req.params.id);
    const usuarioEncontrado = await service.obterPacientePorId(id);
    res.json(usuarioEncontrado);
};


export async function cadastrarPaciente(req: Request, res: Response){
    const dadosPaciente: PacienteDTO = req.body;
    const pacienteCriado = await service.cadastrarPaciente(dadosPaciente);
};

export async function atualizarPaciente(req: Request, res: Response){

};

export async function deletarPaciente(req: Request, res: Response){

};

