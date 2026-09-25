import express from "express"; //framework utilzado para APIs
import dotenv from "dotenv";
import pacienteRoutes from "./routes/pacienteRoutes.js";
import medicoRoutes from "./routes/medicoRoutes.js";

dotenv.config();

const app = express();
app.use(express.json()); //json como padrão nas req e resp http

const PORT: number = Number(process.env.PORT) || 3001;

//app.use(pacienteRoutes); // usar depois de dividir
app.use(medicoRoutes);

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
    {id: 2, nome: "Heitor", telefone: "83999854128"}
);

const medicos: Medico[] = [];
medicos.push(
    {id: 1, nome: "Bruninho", telefone: "83988129232", crm: "102371283", especialidade: "Urologista"},
    {id: 2, nome: "Kleber", telefone: "83998712872", crm: "12313445", especialidade: "Ginecologista"}
);

/* -- CRUD PACIENTES -- */
// GET ALL
app.get("/medicos", (req, res) => {
    res.json(medicos);
});

// GET ONE
app.get("/pacientes/:id", (req, res) => {
    const idProcurado: number = Number(req.params.id); //URL é string, precisa converter
    const pacienteEncontrado: Paciente | undefined = pacientes.find((paciente) => paciente.id === idProcurado);
    if(pacienteEncontrado) res.json(pacienteEncontrado);
    else res.status(404).json(`Paciente de id '${idProcurado}' não encontrado.`);
});

// POST
app.post("/pacientes", (req, res) => {
    const { nome, telefone } = req.body;

    if(!nome || !telefone) {
        return res.status(400).json("Nome e telefone são obrigatórios.");
    }
    if (typeof nome !== "string" || typeof telefone !== "string") {
        return res.status(400).json("Dados inválidos.");
    }
    if (nome.trim() === "" || telefone.trim() === "") {
        return res.status(400).json("Dados inválidos.");
    }

    const novoPaciente: Paciente = {
        id: pacientes[pacientes.length - 1].id + 1,
        nome,
        telefone
    };

    pacientes.push(novoPaciente);
    res.status(201).json(novoPaciente);
});

// PUT
app.put("/pacientes/:id", (req, res) => {
    const idProcurado: number = Number(req.params.id);
    const pacienteEncontrado: Paciente | undefined = pacientes.find((paciente) => paciente.id === idProcurado);
    if(!pacienteEncontrado) return res.status(404).json(`Paciente de id '${idProcurado}' não encontrado.`);

    const { nome, telefone } = req.body;

    if(!nome || !telefone) {
        return res.status(400).json("Nome e telefone são obrigatórios.");
    }
    if (typeof nome !== "string" || typeof telefone !== "string") {
        return res.status(400).json("Dados inválidos.");
    }
    if (nome.trim() === "" || telefone.trim() === "") {
        return res.status(400).json("Dados inválidos.");
    }

    pacienteEncontrado.nome = nome;
    pacienteEncontrado.telefone = telefone;
    res.status(200).json(pacienteEncontrado);
});

// DELETE
app.delete("/pacientes/:id", (req, res) => {
    const idProcurado: number = Number(req.params.id);

    const indice = pacientes.findIndex(
        paciente => paciente.id === idProcurado
    );

    if (indice === -1) return res.status(404).json(`Paciente de id '${idProcurado}' não encontrado.`);

    pacientes.splice(indice, 1);

    res.status(200).json("Paciente removido com sucesso.");
});

/* -- CRUD MÉDICOS -- */
// GET ALL
app.get("/medicos", (req, res) => {
    res.json(medicos);
});

// GET ONE
app.get("/medicos/:id", (req, res) => {
    const idProcurado: number = Number(req.params.id); //URL é string, precisa converter
    const medicoEncontrado: Paciente | undefined = medicos.find((medico) => medico.id === idProcurado);
    if(medicoEncontrado) res.json(medicoEncontrado);
    else res.status(404).json(`Médico de id '${idProcurado}' não encontrado.`);
});

// POST
app.post("/medicos", (req, res) => {
    const { nome, telefone, crm, especialidade } = req.body;

    const novoMedico: Medico = {
        id: medicos[medicos.length - 1].id + 1,
        nome,
        telefone,
        crm,
        especialidade
    };

    medicos.push(novoMedico);
    res.status(201).json(novoMedico);
});

// PUT
app.put("/medicos/:id", (req, res) => {
    const idProcurado: number = Number(req.params.id);
    const medicoEncontrado: Medico | undefined = medicos.find((medico) => medico.id === idProcurado);
    if(!medicoEncontrado) return res.status(404).json(`Médico de id '${idProcurado}' não encontrado.`);

    const { nome, telefone, crm, especialidade } = req.body;

    medicoEncontrado.nome = nome ? nome : medicoEncontrado.nome;
    medicoEncontrado.telefone = telefone ? telefone : medicoEncontrado.telefone;;
    medicoEncontrado.crm = crm ? crm : medicoEncontrado.crm;;
    medicoEncontrado.especialidade = especialidade ? especialidade : medicoEncontrado.especialidade;;
    res.status(200).json(medicoEncontrado);
});

// DELETE
app.delete("/medicos/:id", (req, res) => {
    const idProcurado: number = Number(req.params.id);

    const indice = medicos.findIndex(
        medico => medico.id === idProcurado
    );

    if (indice === -1) return res.status(404).json(`Médico de id '${idProcurado}' não encontrado.`);

    medicos.splice(indice, 1);

    res.status(204).json("Médico removido com sucesso.");
});

// npm run dev (para subir a API)
app.listen(PORT, () => {
    console.log(`A API subiu na porta ${PORT}`);
});