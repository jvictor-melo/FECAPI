import sqlite3 from "sqlite3";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

sqlite3.verbose();

// Pega o diretório atual deste arquivo
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Caminho absoluto para a pasta "data"
const dataDir = path.join(__dirname, "../data");

// Cria a pasta "data" se não existir
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Caminho absoluto do arquivo do banco
const dbPath = path.join(dataDir, "database.sqlite");

console.log("📂 Banco de dados salvo em:", dbPath);

// Conexão com o banco
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("❌ Erro ao abrir banco:", err.message);
  } else {
    console.log("✅ Conexão com banco estabelecida!");
  }
});

// Criar tabelas apenas se não existirem
db.serialize(() => {
	// Usuarios
  db.run(`CREATE TABLE IF NOT EXISTS usuarios (
    id_usuario INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL UNIQUE,
    usuario VARCHAR(255) NOT NULL,
    senha VARCHAR(255) NOT NULL
  )`);
  // Campeonato
  db.run(`
    CREATE TABLE IF NOT EXISTS campeonato (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      data DATE,
      categoria_id INTEGER,
      FOREIGN KEY (categoria_id) REFERENCES categoria(id)
    )
  `);

  // Categoria
  db.run(`
    CREATE TABLE IF NOT EXISTS categoria (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      condicoes TEXT
      )
      `);
  // campeonato_id INTEGER NOT NULL,
  //FOREIGN KEY (campeonato_id) REFERENCES campeonato(id)

  // Competidor
  db.run(`
    CREATE TABLE IF NOT EXISTS competidores (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      id_categoria INTEGER NOT NULL,
      nome TEXT NOT NULL,
      apelido TEXT,
      equipe TEXT,
      FOREIGN KEY (id_categoria) REFERENCES categoria(id)
    )
  `);

  // Rodada
  db.run(`
    CREATE TABLE IF NOT EXISTS rodada (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      categoria_id INTEGER NOT NULL,
      numero INTEGER NOT NULL,
      FOREIGN KEY (categoria_id) REFERENCES categoria(id)
    )
  `);

  // Luta
  db.run(`
    CREATE TABLE IF NOT EXISTS luta (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      rodada_id INTEGER NOT NULL,
      competidor_esq_id INTEGER NOT NULL,
      competidor_dir_id INTEGER NOT NULL,
      FOREIGN KEY (rodada_id) REFERENCES rodada(id),
      FOREIGN KEY (competidor_esq_id) REFERENCES competidor(id),
      FOREIGN KEY (competidor_dir_id) REFERENCES competidor(id)
    )
  `);

  // Nota
  db.run(`
    CREATE TABLE IF NOT EXISTS nota (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      luta_id INTEGER NOT NULL,
      competidor_id INTEGER, -- NULL se for nota geral da luta
      valor REAL NOT NULL,
      tipo TEXT NOT NULL CHECK(tipo IN ('competidor', 'luta')),
      FOREIGN KEY (luta_id) REFERENCES luta(id),
      FOREIGN KEY (competidor_id) REFERENCES competidor(id)
    )
  `);

  // Punição
  db.run(`
    CREATE TABLE IF NOT EXISTS punicao (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      luta_id INTEGER NOT NULL,
      competidor_id INTEGER NOT NULL,
      descricao TEXT,
      pontos_descontados REAL DEFAULT 0,
      FOREIGN KEY (luta_id) REFERENCES luta(id),
      FOREIGN KEY (competidor_id) REFERENCES competidor(id)
    )
  `);

  console.log("📌 Tabelas criadas/verificadas com sucesso!");
});

export default db;
