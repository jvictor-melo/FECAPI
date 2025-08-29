import db from '../config/db.js';

export async function createRodada(req, res) {
  const { categoria_id, numero } = req.body;
  const result = await db.run(
    `INSERT INTO rodada (categoria_id, numero) VALUES (?, ?)`,
    [categoria_id, numero]
  );
  res.json({ id: result.lastID, categoria_id, numero });
}

export async function getRodadas(req, res) {
  const rows = await db.all(`SELECT * FROM rodada`);
  res.json(rows);
}

export async function calcularPontuacao(req, res) {
  const rodadaId = req.params.id;
  const rows = await db.all(
    `
    SELECT 
      c.id AS competidor_id,
      c.nome,
      COALESCE(SUM(n.valor), 0) - COALESCE(SUM(p.pontos_descontados), 0) AS pontuacao_final
    FROM competidor c
    JOIN luta l ON (c.id = l.competidor_esq_id OR c.id = l.competidor_dir_id)
    JOIN nota n ON n.luta_id = l.id AND n.tipo = 'competidor' AND n.competidor_id = c.id
    LEFT JOIN punicao p ON p.luta_id = l.id AND p.competidor_id = c.id
    WHERE l.rodada_id = ?
    GROUP BY c.id, c.nome
    ORDER BY pontuacao_final DESC
    `,
    [rodadaId]
  );
  res.json(rows);
}
