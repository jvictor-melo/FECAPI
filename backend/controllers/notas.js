import db from '../config/db.js';

export async function createNota(req, res) {
  const { luta_id, competidor_id, valor, tipo } = req.body;
  const result = await db.run(
    `INSERT INTO nota (luta_id, competidor_id, valor, tipo) VALUES (?, ?, ?, ?)`,
    [luta_id, competidor_id, valor, tipo]
  );
  res.json({ id: result.lastID, luta_id, competidor_id, valor, tipo });
}

export async function getNotas( __, res) {
  const rows = await db.all(`SELECT * FROM nota`);
  res.json(rows);
}
