import React from "react";

export default function CompetidorList({ competidores, categorias, onDelete }) {
  const getCategoriaNome = (id) => {
    const categoria = categorias.find(c => c.id === id);
    return categoria ? categoria.nome : 'N/A';
  };

  return (
    <table className="competidores-table">
      <thead>
        <tr>
          <th>Nome</th>
          <th>Categoria</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {competidores.map(competidor => (
          <tr key={competidor.id}>
            <td>{competidor.nome}</td>
            <td>{getCategoriaNome(competidor.id_categoria)}</td>
            <td>
              <button 
                onClick={() => onDelete(competidor.id)}
                className="delete-button"
              >
                Excluir
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}