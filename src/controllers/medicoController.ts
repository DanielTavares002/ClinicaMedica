import type { Request, Response } from "express";
import * as service from "../services/medicoService.js";
import type { Medico } from "../interfaces/medicoInterface.js";
import type { MedicoDTO } from "../interfaces/medicoInterface.js";

export async function obterMedicos(req: Request, res: Response) {
    const medicos: Medico[] = await service.obterMedicos();
    return res.json(medicos)
};

export async function obterMedicoPorId(req: Request, res: Response) {
    const id: number = Number(req.params.id);
    const medicoEncontrado = await service.obterMedicoPorId(id);
    if (!medicoEncontrado) res.status(404);
    res.json(medicoEncontrado);
};

export async function criarMedico(req: Request, res: Response){
    const dados: MedicoDTO = req.body;
    if (!dados.nome || !dados.telefone || !dados.crm || !dados.especialidade) {
        return res.status(400).json("Todos os campos são obrigatórios!")
    }

    const novoMedico: Medico = await service.criarMedico(dados);

    if(!novoMedico) res.status(500);
    res.status(204).json(novoMedico);

};

export async function alterarMedico(req: Request, res: Response){

};

export async function deletarMedico(req: Request, res: Response){

};