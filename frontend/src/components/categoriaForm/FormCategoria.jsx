// src/components/CategoriaForm.jsx
import React, { useState } from "react";
import "./styles.css";

export default function CategoriaForm({ onSubmit }) {
  const [nome, setNome] = useState("");
  const [condicoes, setCondicoes] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ nome, condicoes });
    setNome("");
    setCondicoes("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nome:</label>
        <input value={nome} onChange={(e) => setNome(e.target.value)} required />
      </div>
      <div>
        <label>Condições:</label>
        <textarea value={condicoes} onChange={(e) => setCondicoes(e.target.value)} required />
      </div>
      <button type="submit">Salvar</button>
    </form>
  );
}
