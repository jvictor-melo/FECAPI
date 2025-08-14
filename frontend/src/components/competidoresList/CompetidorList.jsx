// src/components/CompetidorList.jsx
import React from "react";

export default function CompetidorList({ competidores, onDelete }) {
  return (
    <ul>
      {competidores.map((comp) => (
        <li key={comp.id_competidores}>
          {comp.nome} - {comp.idade} anos (Categoria: {comp.id_categoria}, Notas: {comp.id_notas})
          <button onClick={() => onDelete(comp.id_competidores)}>Excluir</button>
        </li>
      ))}
    </ul>
  );
}
