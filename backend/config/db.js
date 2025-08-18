import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

sqlite3.verbose();

// Pega o diretório atual deste arquivo
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Caminho absoluto para a pasta "data"
const dataDir = path.join(__dirname, '../data');

// Cria a pasta "data" se não existir
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Caminho absoluto do arquivo do banco
const dbPath = path.join(dataDir, 'database.sqlite');

console.log('Banco de dados salvo em:', dbPath);

// Conexão com o banco
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Erro ao abrir banco:', err.message);
  }
});

// Criar tabelas apenas se não existirem
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS categoria (
    id_categoria INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL UNIQUE,
    nome VARCHAR(255) NOT NULL,
    condicoes TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS notas (
    id_notas INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL UNIQUE,
    nota_1 FLOAT(20) NOT NULL,
    nota_2 FLOAT(20) NOT NULL,
    nota_3 FLOAT NOT NULL
  )`);
  
  db.run(`CREATE TABLE IF NOT EXISTS usuarios (
    id_usuario INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL UNIQUE,
    usuario VARCHAR(255) NOT NULL,
    senha VARCHAR(255) NOT NULL
  )`);
  
  db.run(`CREATE TABLE IF NOT EXISTS competidores (
    id_competidores INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL UNIQUE,
    nome VARCHAR(255) NOT NULL,
    id_categoria INTEGER,
    FOREIGN KEY(id_categoria) REFERENCES categoria(id_categoria)
  )`);
});

export default db;
