import Router from "express";
import * as controller from "../controllers/pacienteController.js";
import { validarBody } from "../middlewares/validarSchema.js";
import { pacienteSchema } from "../schemas/pacienteSchema.js";

const router = Router();

router.get("/pacientes", controller.listar);
router.get("/pacientes/:id", controller.buscarPorId);
router.post("/pacientes", validarBody(pacienteSchema), controller.cadastrar);
router.put("/pacientes/:id", validarBody(pacienteSchema), controller.atualizar);
router.delete("/pacientes/:id", controller.deletar);

export default router;
