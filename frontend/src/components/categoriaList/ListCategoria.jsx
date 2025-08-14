// src/components/CategoriaList.jsx
import React from "react";

export default function CategoriaList({ categorias, onDelete }) {
  return (
    <ul>
      {categorias.map((cat) => (
        <li key={cat.id_categoria}>
          {cat.nome} - {cat.condicoes}
          <button onClick={() => onDelete(cat.id_categoria)}>Excluir</button>
        </li>
      ))}
    </ul>
  );
}
