import express from "express";
import cors from "cors";

//importes das rotas
import competidoresRoutes from './routes/competidores.js';
import categoriaRoutes from './routes/categoria.js';
import notasRoutes from './routes/notas.js';

//porta do servidor
const PORT = 3030;
const api = express();


api.use(express.json());
api.use(cors());

//rotas dos servicos
api.use('/competidores', competidoresRoutes);
api.use('/categoria', categoriaRoutes);
api.use('/notas', notasRoutes);

api.listen(PORT, () => {
    console.log(`Servidor escutando em http://localhost:${PORT}`)
});