import db from '../config/db.js';

export const getAll = (req, res) => {
  db.all('SELECT * FROM competidores', [], (err, rows) => {
    if (err) return res.status(500).json(err);
    res.json(rows);
  });
};

export const create = (req, res) => {
  const { nome, id_categoria } = req.body;
  try {
    db.run(`INSERT INTO competidores (nome, id_categoria) VALUES (?, ?)`,
      [nome, id_categoria], function (err) {
        if (err) return res.status(500).json(err);
        res.json({ id: this.lastID });
      });
    } catch {
      console.log("deu erro no create de competidores")
    }
};

export const update = (req, res) => {
  const { id } = req.params;
  const { nome, id_categoria, id_notas } = req.body;
  db.run(`UPDATE competidores SET nome = ?, id_categoria = ?, id_notas = ? WHERE id_competidores = ?`,
    [nome, id_categoria, id_notas, id], function (err) {
      if (err) return res.status(500).json(err);
      res.json({ changes: this.changes });
    });
};

export const remove = (req, res) => {
  const { id } = req.params;
  db.run(`DELETE FROM competidores WHERE id_competidores = ?`, [id], function (err) {
    if (err) return res.status(500).json(err);
    res.json({ changes: this.changes });
  });
};
