import express from "express";
import { createRodada, getRodadas, calcularPontuacao } from "../controllers/rodada.js";

const router = express.Router();

router.post("/", createRodada);
router.get("/", getRodadas);
router.get("/:id/pontuacao", calcularPontuacao);

export default router;
