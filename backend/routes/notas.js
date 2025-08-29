import express from 'express';
import { getNotas, createNota } from '../controllers/notas.js';

const router = express.Router();

router.get('/', getNotas);
router.post('/', createNota);
//router.put('/:id', update);
//router.delete('/:id', remove);

export default router;
