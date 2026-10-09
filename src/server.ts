import express from "express";
import dotenv from "dotenv";
import pacienteRoutes from "./routes/pacienteRoutes.js";
import medicoRoutes from "./routes/medicoRoutes.js";
import consultaRoutes from "./routes/consultaRoutes.js";

dotenv.config();

const app = express();
app.use(express.json()); 

const PORT: number = Number(process.env.PORT) || 3001;

app.use(pacienteRoutes);
app.use(medicoRoutes);
app.use(consultaRoutes);

app.listen(PORT, () => {
    console.log(`A API subiu na porta ${PORT}`);
});