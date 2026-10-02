import type { Request, Response } from "express";
import * as service from "../services/pacienteService.js";

export function obtemUmPaciente(req: Request, res: Response){
    const id: number = Number(req.params.id);
    const usuarioEncontrado = service.obtemPacientePorId(id);
    res.json(usuarioEncontrado);
};