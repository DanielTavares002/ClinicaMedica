import type { Medico } from "../interfaces/medicoInterface.js";

const medicos: Medico[] = [
    {id: 1, nome: "Bruninho", telefone: "83988129232", crm: "102371283", especialidade: "Urologista"},
    {id: 2, nome: "Kleber", telefone: "83998712872", crm: "12313445", especialidade: "Ginecologista"}
];

export async function obterMedicos(): Promise<Medico[]> {
    return medicos;
};

export async function obterMedicoPorId(id: number): Promise<Medico | undefined> {
    return medicos.find((medico) => medico.id === id);
};

export async function criarMedico(){

};

export async function alterarMedico(id: number){

};

export async function deletarMedico(id: number){

};