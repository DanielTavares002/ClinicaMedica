import type { Request, Response } from "express";
import * as service from "../services/consultaService.js";
import type { Consulta, ConsultaDTO } from "../types/consulta.js";

export async function obterConsultas(req: Request, res: Response) {
    const consultas: Consulta[] = await service.obterConsultas();
    return res.json(consultas);
};

export async function obterConsultaPorId(req: Request, res: Response){
    const id: number = Number(req.params.id);
    const consulta: Consulta | undefined = await service.obterConsultaPorId(id);

    if(!consulta) res.status(404);
    res.json(consulta);
};

export async function cadastrarConsulta(req: Request, res: Response){
    const dados: ConsultaDTO = req.body;
    if(!dados.idMedico || !dados.idPaciente || !dados.dataConsulta || !dados.motivoConsulta) return res.status(400).json("Todos os campos são obrigatórios.");
    
    const novaConsulta: Consulta = await service.cadastrarConsulta(dados);
    if(!novaConsulta) res.status(500);

    res.status(201).json(novaConsulta);
};

export async function atualizarConsulta(req: Request, res: Response){
    const id: number = Number(req.params.id);
    const dados: ConsultaDTO = req.body;
    if(!dados.idMedico || !dados.idPaciente || !dados.dataConsulta || !dados.motivoConsulta) return res.status(400).json("Todos os campos são obrigatórios.");

    const consultaAtualizada: Consulta | undefined = await service.atualizarConsulta(id, dados);
    if(!consultaAtualizada) return res.status(404);

    res.status(200).json(consultaAtualizada);
};

export async function deletarConsulta(req: Request, res: Response){
    const id: number = Number(req.params.id);
    const consultaRemovida: Consulta | undefined = await service.deletarConsulta(id);

    if(!consultaRemovida) return res.status(404).send();
    return res.status(204).send();
};