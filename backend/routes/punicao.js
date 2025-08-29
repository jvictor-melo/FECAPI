import express from "express";
import { getPunicoes, createPunicao } from "../controllers/punicao.js";

const router = express.Router();


router.post("/", createPunicao);
router.get("/", getPunicoes);

export default router;