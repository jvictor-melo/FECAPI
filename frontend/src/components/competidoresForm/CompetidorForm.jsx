// src/components/CompetidorForm.jsx
import React, { useState } from "react";

export default function CompetidorForm({ onSubmit }) {
  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState("");
  const [id_categoria, setIdCategoria] = useState("");
  const [id_notas, setIdNotas] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ nome, idade: Number(idade), id_categoria: Number(id_categoria), id_notas: Number(id_notas) });
    setNome(""); setIdade(""); setIdCategoria(""); setIdNotas("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} required />
      <input placeholder="Idade" type="number" value={idade} onChange={(e) => setIdade(e.target.value)} required />
      <input placeholder="ID Categoria" value={id_categoria} onChange={(e) => setIdCategoria(e.target.value)} required />
      <input placeholder="ID Notas" value={id_notas} onChange={(e) => setIdNotas(e.target.value)} required />
      <button type="submit">Salvar</button>
    </form>
  );
}
