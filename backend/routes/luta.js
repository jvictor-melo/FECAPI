import express from "express";
import { createLuta, getLuta } from "../controllers/luta.js";

const router = express.Router();

router.post("/", createLuta);
router.get("/", getLuta);

export default router;
