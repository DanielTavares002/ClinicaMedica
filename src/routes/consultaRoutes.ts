import Router from "express";
import * as controller from "../controllers/consultaController.js";

const router = Router();

router.get("/consultas", controller.obterConsultas);
router.get("/consultas/:id", controller.obterConsultaPorId);
router.post("/consultas", controller.cadastrarConsulta);
router.put("/consultas/:id", controller.atualizarConsulta);
router.delete("/consultas/:id", controller.deletarConsulta);

export default router;