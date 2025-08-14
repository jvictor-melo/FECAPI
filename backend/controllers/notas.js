import db from '../config/db.js';

export const getAll = (req, res) => {
  db.all('SELECT * FROM notas', [], (err, rows) => {
    if (err) return res.status(500).json(err);
    res.json(rows);
  });
};

export const create = (req, res) => {
  const { nota_1, nota_2, nota_3 } = req.body;
  db.run(`INSERT INTO notas (nota_1, nota_2, nota_3) VALUES (?, ?, ?)`, [nota_1, nota_2, nota_3], function (err) {
    if (err) return res.status(500).json(err);
    res.json({ id: this.lastID });
  });
};

export const update = (req, res) => {
  const { id } = req.params;
  const { nota_1, nota_2, nota_3 } = req.body;
  db.run(`UPDATE notas SET nota_1 = ?, nota_2 = ?, nota_3 = ? WHERE id_notas = ?`, [nota_1, nota_2, nota_3, id], function (err) {
    if (err) return res.status(500).json(err);
    res.json({ changes: this.changes });
  });
};

export const remove = (req, res) => {
  const { id } = req.params;
  db.run(`DELETE FROM notas WHERE id_notas = ?`, [id], function (err) {
    if (err) return res.status(500).json(err);
    res.json({ changes: this.changes });
  });
};
