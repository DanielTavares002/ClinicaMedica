import express from "express"; //framework utilzado para APIs
import dotenv from "dotenv";
import pacienteRoutes from "./routes/pacienteRoutes.js";
import medicoRoutes from "./routes/medicoRoutes.js";
import consultaRoutes from "./routes/consultaRoutes.js";

dotenv.config();

const app = express();
app.use(express.json()); //json como padrão nas req e resp http

const PORT: number = Number(process.env.PORT) || 3001;

//app.use(pacienteRoutes);
app.use(medicoRoutes);
app.use(consultaRoutes);
/*
interface Paciente {
    id: number;
    nome: string;
    telefone: string;
};

interface Medico {
    id: number;
    nome: string;
    telefone: string;
    crm: string;
    especialidade: string;
}

const pacientes: Paciente[] = [];
pacientes.push(
    {id: 1, nome: "Samla", telefone: "83999885448"},
    {id: 2, nome: "Amora", telefone: "83999854128"}
);

const medicos: Medico[] = [];
medicos.push(
    {id: 1, nome: "Heitor", telefone: "83956841256", crm: "CF5645", especialidade: "Neurologista"},
    {id: 2, nome: "Ana", telefone: "83914523256", crm: "CFT452", especialidade: "Cardiologista"}
);

// GET ALL (Pacientes)
app.get("/pacientes", (req, res) => {
    res.json(pacientes);
});

// GET ONE (Paciente)
app.get("/pacientes/:id", (req, res) => {
    const idProcurado: number = Number(req.params.id); //URL é string, precisa converter
    const pacienteEncontrado: Paciente | undefined = pacientes.find((paciente) => paciente.id === idProcurado);
    if(pacienteEncontrado) res.json(pacienteEncontrado);
    else res.status(404).json(`Paciente de id '${idProcurado}' não encontrado.`);
});

// POST (Paciente)
app.post("/pacientes", (req, res) => {
    const { nome, telefone } = req.body;
    const ultimoId = pacientes[pacientes.length - 1].id;

    const novoPaciente: Paciente = {
        id: ultimoId + 1,
        nome,
        telefone
    };

    pacientes.push(novoPaciente);
    res.status(201).json(novoPaciente);
});

// PUT (Paciente)
app.put("/pacientes/:id", (req, res) => {
    const idProcurado: number = Number(req.params.id);
    const pacienteEncontrado: Paciente | undefined = pacientes.find((paciente) => paciente.id === idProcurado);
    if(!pacienteEncontrado) return res.status(404).json(`Paciente de id '${idProcurado}' não encontrado.`);

    const { nome, telefone } = req.body;

    pacienteEncontrado.nome = nome;
    pacienteEncontrado.telefone = telefone;
    res.status(200).json(pacienteEncontrado);
});

// DELETE (Paciente)
app.delete("/pacientes/:id", (req, res) => {
    const idProcurado: number = Number(req.params.id);

    const indice = pacientes.findIndex(
        paciente => paciente.id === idProcurado
    );

    if (indice === -1) return res.status(404).json(`Paciente de id '${idProcurado}' não encontrado.`);

    pacientes.splice(indice, 1);

    res.status(200).json("Paciente removido com sucesso.");
});

// GET ALL (Médicos)
app.get("/medicos", (req, res) => {
    res.json(medicos);
});

// GET ONE (Médico)
app.get("/medicos/:id", (req, res) => {
    const idProcurado: number = Number(req.params.id); //URL é string, precisa converter
    const medicoEncontrado: Medico | undefined = medicos.find((medico) => medico.id === idProcurado);
    if(medicoEncontrado) res.json(medicoEncontrado);
    else res.status(404).json(`Médico de id '${idProcurado}' não encontrado.`);
});

// POST (Médico)
app.post("/medicos", (req, res) => {
    const { nome, telefone, crm, especialidade } = req.body;
    const ultimoId = medicos[medicos.length - 1].id;

    const novoMedico: Medico = {
        id: ultimoId + 1,
        nome,
        telefone,
        crm,
        especialidade
    };

    medicos.push(novoMedico);
    res.status(201).json(novoMedico);
});

// PUT (Médico)
app.put("/medicos/:id", (req, res) => {
    const idProcurado: number = Number(req.params.id);
    const medicoEncontrado: Medico | undefined = medicos.find((medico) => medico.id === idProcurado);
    if(!medicoEncontrado) return res.status(404).json(`Médico de id '${idProcurado}' não encontrado.`);

    const { nome, telefone, crm, especialidade } = req.body;

    medicoEncontrado.nome = nome;
    medicoEncontrado.telefone = telefone;
    medicoEncontrado.crm = crm;
    medicoEncontrado.especialidade = especialidade;

    res.status(200).json(medicoEncontrado);
});

// DELETE (Médico)
app.delete("/medicos/:id", (req, res) => {
    const idProcurado: number = Number(req.params.id);

    const indice = medicos.findIndex(
        medico => medico.id === idProcurado
    );

    if (indice === -1) return res.status(404).json(`Médico de id '${idProcurado}' não encontrado.`);

    medicos.splice(indice, 1);

    res.status(204).json("Médico removido com sucesso.");
});
*/
// npm run dev (para subir a API)
app.listen(PORT, () => {
    console.log(`A API subiu na porta ${PORT}`);
});