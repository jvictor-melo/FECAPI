import React from "react";

export default function CompetidorList({ competidores, categorias, onDelete, onEdit }) {
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
                onClick={() => onEdit(competidor)}
                className="edit-button"
              >
                Editar
              </button>
              <button //vou colocar uma confirmação aq so pra n excluir sem querer
                onClick={() => {
                  if (window.confirm('Tem certeza que vai excluir esse competidor?')) {
                    onDelete(competidor.id);
                  }
                }}
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