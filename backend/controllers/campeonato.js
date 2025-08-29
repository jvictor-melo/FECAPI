import db from '../config/db.js';

export async function createCampeonato(req, res) {
  const { nome, data } = req.body;
  const result = await db.run(`INSERT INTO campeonato (nome, data) VALUES (?, ?)`, [nome, data]);
  res.json({ id: result.lastID, nome, data });
}

export async function getCampeonatos(req, res) {
  const rows = await db.all(`SELECT * FROM campeonato`);
  res.json(rows);
}

export async function getCampeonato(req, res) {
  const row = await db.get(`SELECT * FROM campeonato WHERE id = ?`, [req.params.id]);
  res.json(row);
}

export async function updateCampeonato(req, res) {
  const { nome, data } = req.body;
  await db.run(`UPDATE campeonato SET nome=?, data=? WHERE id=?`, [nome, data, req.params.id]);
  res.json({ id: req.params.id, nome, data });
}

export async function deleteCampeonato(req, res) {
  await db.run(`DELETE FROM campeonato WHERE id=?`, [req.params.id]);
  res.json({ success: true });
}
