import Router from "express";
import * as controller from "../controllers/medicoController.js";

const router = Router();

router.get("/medicos", controller.obterMedicos);
router.get("/medicos/:id", controller.obterMedicoPorId);
router.post("/medicos", controller.criarMedico);
router.put("/medicos/:id", controller.alterarMedico);
router.delete("/medicos/:id", controller.deletarMedico);

export default router;