export interface Consulta {
    id: number;
    idMedico: number;
    idPaciente: number;
    dataConsulta: string;
    motivoConsulta: string;
}

export interface ConsultaDTO {
    idMedico?: number;
    idPaciente?: number;
    dataConsulta?: string;
    motivoConsulta?: string;
}