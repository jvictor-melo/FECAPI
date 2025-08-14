import db from '../config/db.js';

export const getAll = (req, res) => {
  db.all('SELECT * FROM categoria', [], (err, rows) => {
    if (err) return res.status(500).json(err);
    res.json(rows);
  });
};

export const create = (req, res) => {
  const { nome, condicoes } = req.body;
  db.run(`INSERT INTO categoria (nome, condicoes) VALUES (?, ?)`, [nome, condicoes], function (err) {
    if (err) return res.status(500).json(err);
    res.json({ id: this.lastID });
  });
};

export const update = (req, res) => {
  const { id } = req.params;
  const { nome, condicoes } = req.body;
  db.run(`UPDATE categoria SET nome = ?, condicoes = ? WHERE id_categoria = ?`, [nome, condicoes, id], function (err) {
    if (err) return res.status(500).json(err);
    res.json({ changes: this.changes });
  });
};

export const remove = (req, res) => {
  const { id } = req.params;
  db.run(`DELETE FROM categoria WHERE id_categoria = ?`, [id], function (err) {
    if (err) return res.status(500).json(err);
    res.json({ changes: this.changes });
  });
};
