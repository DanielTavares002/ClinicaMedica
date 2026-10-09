import type { Consulta, ConsultaDTO } from "../types/consulta.js";

const consultas: Consulta[] = [];
    consultas.push(
        {id: 1, idMedico: 1, idPaciente: 1, dataConsulta: "12/10/2026 - 10:00 AM", motivoConsulta: "Dor extrema na parte de trás da cabeça"},
        {id: 2, idMedico: 2, idPaciente: 2, dataConsulta: "13/10/2026 - 12:00 AM", motivoConsulta: "Suspeita de hipertensão"}
    );

export async function obterConsultas() : Promise<Consulta[]> {
    return consultas;
};

export async function obterConsultaPorId(id: number) : Promise<Consulta | undefined>{
  
    return consultas.find((consulta) => consulta.id === id);
};

export async function cadastrarConsulta(dados: ConsultaDTO) {
    const { idMedico, idPaciente, dataConsulta, motivoConsulta } = dados;

    const ultimoId = consultas[consultas.length - 1].id;

    const novoMedico: Consulta = {
        id: ultimoId + 1,
        idMedico: idMedico!,
        idPaciente: idPaciente!,
        dataConsulta: dataConsulta!,
        motivoConsulta: motivoConsulta!
    };

    consultas.push(novoMedico);
    return novoMedico;
};

export async function atualizarConsulta(id: number, dados: ConsultaDTO) : Promise<Consulta | undefined> {
    const consultaEncontrada: Consulta | undefined = consultas.find((consulta) => consulta.id === id);
    if(!consultaEncontrada) return;

    const { idMedico, idPaciente, dataConsulta, motivoConsulta } = dados;
    consultaEncontrada.idMedico = idMedico!;
    consultaEncontrada.idPaciente = idPaciente!;
    consultaEncontrada.dataConsulta = dataConsulta!;
    consultaEncontrada.motivoConsulta = motivoConsulta!;

    return(consultaEncontrada);
};

export async function deletarConsulta(id: number) : Promise<Consulta | undefined>{
    const indice = consultas.findIndex( consulta => consulta.id === id);
    if (indice === -1) return;

    const consultaRemovida = consultas[indice];
    consultas.splice(indice, 1);

    return consultaRemovida;
};