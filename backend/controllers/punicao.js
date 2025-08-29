import  db  from "../config/db.js";

export async function createPunicao(req, res) {
  const { luta_id, competidor_id, descricao, pontos_descontados } = req.body;
  const result = await db.run(
    `INSERT INTO punicao (luta_id, competidor_id, descricao, pontos_descontados) VALUES (?, ?, ?, ?)`,
    [luta_id, competidor_id, descricao, pontos_descontados]
  );
  res.json({ id: result.lastID, luta_id, competidor_id, descricao, pontos_descontados });
}

export async function getPunicoes(req, res) {
  const rows = await db.all(`SELECT * FROM punicao`);
  res.json(rows);
}
