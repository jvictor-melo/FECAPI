import sqlite3 from 'sqlite3';
sqlite3.verbose();

const db = new sqlite3.Database('../backend/data/database.sqlite');

db.serialize(() => {
  db.run(`DROP TABLE IF EXISTS competidores`);
  db.run(`DROP TABLE IF EXISTS categoria`);
  db.run(`DROP TABLE IF EXISTS notas`);

  db.run(`CREATE TABLE categoria (
    id_categoria INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL UNIQUE,
    nome VARCHAR(255) NOT NULL,
    condicoes TEXT NOT NULL
  )`);

  db.run(`CREATE TABLE notas (
    id_notas INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL UNIQUE,
    nota_1 FLOAT(20) NOT NULL,
    nota_2 FLOAT(20) NOT NULL,
    nota_3 FLOAT NOT NULL
  )`);

  db.run(`CREATE TABLE competidores (
    id_competidores INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    nome VARCHAR(255) NOT NULL,
    idade INT NOT NULL,
    id_categoria INTEGER NOT NULL,
    id_notas INTEGER NOT NULL,
    FOREIGN KEY(id_categoria) REFERENCES categoria(id_categoria),
    FOREIGN KEY(id_notas) REFERENCES notas(id_notas)
  )`);
});

export default db;
