import type { Request, Response } from "express";
import * as service from "../services/medicoService.js";
import type { Medico } from "../types/medicoInterface.js";
import type { MedicoDTO } from "../types/medicoDTOInterface.js";

export async function obterMedicos(req: Request, res: Response) {
    const medicos: Medico[] = await service.obterMedicos();
    return res.json(medicos);
};

export async function obterMedicoPorId(req: Request, res: Response){
    const id: number = Number(req.params.id);
    const medico: Medico | undefined = await service.obterMedicoPorId(id);
    if(!medico) res.status(404);

    res.json(medico);
};

export async function cadastrarMedico(req: Request, res: Response){
    const dados: MedicoDTO = req.body;
    if(!dados.nome || !dados.telefone || !dados.crm || !dados.especialidade) return res.status(400).json("Todos os campos são obrigatórios.");

    const novoMedico: Medico = await service.cadastrarMedico(dados);

    if(!novoMedico) res.status(500);

    res.status(201).json(novoMedico);
};

export async function atualizarMedico(req: Request, res: Response){
    const id: number = Number(req.params.id);
    const dados: MedicoDTO = req.body;
    if(!dados.nome || !dados.telefone || !dados.crm || !dados.especialidade) return res.status(400).json("Todos os campos são obrigatórios.");

    const medicoAtualizado: Medico | undefined = await service.atualizarMedico(id, dados);
    if(!medicoAtualizado) return res.status(404).json("Médico não encontrado.");

    res.status(200).json(medicoAtualizado);
};

export async function deletarMedico(req: Request, res: Response){
    const id: number = Number(req.params.id);
    const medicoRemovido: Medico | undefined = await service.deletarMedico(id);
    if(!medicoRemovido) return res.status(404).json("Médico não encontrado.");

    return res.status(200).json("Médico removido com sucesso.");
};

