import Router from "express";
import * as controller from "../controllers/pacienteController.js";

const router = Router();

router.get("/pacientes", controller.obterPacientes);
router.get("/pacientes/:id", controller.obterPacientePorId);
router.post("/pacientes", controller.cadastrarPaciente);
router.put("/pacientes/:id", controller.atualizarPaciente);
router.delete("/pacientes/:id", controller.deletarPaciente);

export default router;

