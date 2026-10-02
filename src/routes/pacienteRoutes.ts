import Router from "express";
import * as controller from "../controllers/pacienteController.js";

const router = Router();

//router.get("/pacientes");
router.get("/pacientes/:id", controller.obtemUmPaciente);

export default router;

