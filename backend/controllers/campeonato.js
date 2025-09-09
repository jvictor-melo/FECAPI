import db from '../config/db.js';

// ATUALIZADO PRA TER CATEGORIA NO CAMPEONATO PAI

export async function createCampeonato(req, res) {
  const { nome, data, categoria_id } = req.body;
  const result = await db.run(
    `INSERT INTO campeonato (nome, data, categoria_id) VALUES (?, ?, ?)`, 
    [nome, data, categoria_id]
  );
  res.json({ id: result.lastID, nome, data, categoria_id });
}

export async function getCampeonatos(req, res) {
  const rows = await db.all(`
    SELECT c.*, cat.nome as categoria_nome 
    FROM campeonato c 
    LEFT JOIN categoria cat ON c.categoria_id = cat.id_.id
  `);
  res.json(rows);
}

export async function getCampeonato(req, res) {
  const row = await db.get(`
    SELECT c.*, cat.nome as categoria_nome 
    FROM campeonato c 
    LEFT JOIN categoria cat ON c.categoria_id = cat.id 
    WHERE c.id = ?
  `, [req.params.id]);
  res.json(row);
}

export async function updateCampeonato(req, res) {
  const { nome, data, categoria_id } = req.body;
  await db.run(
    `UPDATE campeonato SET nome=?, data=?, categoria_id=? WHERE id=?`, 
    [nome, data, categoria_id, req.params.id]
  );
  res.json({ id: req.params.id, nome, data, categoria_id });
}

export async function deleteCampeonato(req, res) {
  await db.run(`DELETE FROM campeonato WHERE id=?`, [req.params.id]);
  res.json({ success: true });
}
