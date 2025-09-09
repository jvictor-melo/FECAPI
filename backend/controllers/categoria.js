import db from '../config/db.js';

//! lembrar de fazer os erros

export const getAll = (req, res) => {
  db.all('SELECT * FROM categoria', [], (err, rows) => {
    if (err) return res.status(500).json(err);
    res.json(rows);
  });
};

// getid
export const getById = (req, res) => {
  const { id } = req.params;
  
  db.get('SELECT * FROM categoria WHERE id = ?', [id], (err, row) => {
    if (err) {
      console.error("erro ao buscar categoria:", err);
      return res.status(500).json({ error: 'erro do servidor' });
    }
    if (!row) {
      return res.status(404).json({ error: 'categoria nao encontadra' });
    }
    res.json(row);
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
  db.run(`UPDATE categoria SET nome = ?, condicoes = ? WHERE id = ?`, [nome, condicoes, id], function (err) {
    if (err) return res.status(500).json(err);
    res.json({ changes: this.changes });
  });
};

export const remove = (req, res) => {
  const { id } = req.params;
  db.run(`DELETE FROM categoria WHERE id = ?`, [id], function (err) {
    if (err) return res.status(500).json(err);
    res.json({ changes: this.changes });
  });
};
