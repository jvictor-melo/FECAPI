import db from '../config/db.js';

export async function createLuta(req, res) {
  const { rodada_id, competidor_esq_id, competidor_dir_id } = req.body;
  const result = await db.run(
    `INSERT INTO luta (rodada_id, competidor_esq_id, competidor_dir_id) VALUES (?, ?, ?)`,
    [rodada_id, competidor_esq_id, competidor_dir_id]
  );
  res.json({ id: result.lastID, rodada_id, competidor_esq_id, competidor_dir_id });
}

export async function getLuta(req, res) {
  const rows = await db.all(`SELECT * FROM luta`);
  res.json(rows);
}
