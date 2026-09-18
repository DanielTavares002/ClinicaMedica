import express from "express"; //framework utilzado para APIs
import dotenv from "dotenv";
import pacienteRoutes from "./routes/pacienteRoutes.js";

dotenv.config();

const app = express();
app.use(express.json()); //json como padrão nas req e resp http

const PORT: number = Number(process.env.PORT) || 3001;

app.use(pacienteRoutes);

interface Usuario {
    id: number;
    nome: string;
    telefone: string;
};

const usuarios: Usuario[] = [];
usuarios.push(
    {id: 1, nome: "Samla", telefone: "83999885448"},
    {id: 2, nome: "Heitor", telefone: "83999854128"}
);

// GET ALL
app.get("/usuarios", (req, res) => {
    res.json(usuarios);
});

// GET ONE
app.get("/usuarios/:id", (req, res) => {
    const idProcurado: number = Number(req.params.id); //URL é string, precisa converter
    const usuarioEncontrado: Usuario | undefined = usuarios.find((usuario) => usuario.id === idProcurado);
    if(usuarioEncontrado) res.json(usuarioEncontrado);
    else res.status(404).json(`Usuário de id '${idProcurado}' não encontrado.`);
});

// POST
app.post("/usuarios", (req, res) => {
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

    const novoUsuario: Usuario = {
        id: usuarios[usuarios.length - 1].id + 1,
        nome,
        telefone
    };

    usuarios.push(novoUsuario);
    res.status(201).json(novoUsuario);
});

// PUT
app.put("/usuarios/:id", (req, res) => {
    const idProcurado: number = Number(req.params.id);
    const usuarioEncontrado: Usuario | undefined = usuarios.find((usuario) => usuario.id === idProcurado);
    if(!usuarioEncontrado) return res.status(404).json(`Usuário de id '${idProcurado}' não encontrado.`);

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

    usuarioEncontrado.nome = nome;
    usuarioEncontrado.telefone = telefone;
    res.status(200).json(usuarioEncontrado);
});

// DELETE
app.delete("/usuarios/:id", (req, res) => {
    const idProcurado: number = Number(req.params.id);

    const indice = usuarios.findIndex(
        usuario => usuario.id === idProcurado
    );

    if (indice === -1) return res.status(404).json(`Usuário de id '${idProcurado}' não encontrado.`);

    usuarios.splice(indice, 1);

    res.status(200).json("Usuário removido com sucesso.");
});

// npm run dev (para subir a API)
app.listen(PORT, () => {
    console.log(`A API subiu na porta ${PORT}`);
});