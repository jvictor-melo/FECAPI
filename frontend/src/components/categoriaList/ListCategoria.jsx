import React from "react";
import './styles.css'

export default function CategoriaList({ categorias, onDelete, onEdit }) {
  return (
    <div className="categorias-container">
      <div className="categorias-header">
        <h2 className="categorias-title">Gerenciar Categorias</h2>
      </div>
      
      <table className="categorias-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Condições</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {categorias.length > 0 ? (
            categorias.map((cat) => (
              <tr key={cat.id_categoria}>
                <td>{cat.nome}</td>
                <td>{cat.condicoes}</td>
                <td>
                  <div className="categorias-actions-container">
                    <button
                      onClick={() => onEdit(cat)}
                      className="categoria-edit-button"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm('Tem certeza que deseja excluir esta categoria?')) {
                          onDelete(cat.id_categoria);
                        }
                      }}
                      className="categoria-delete-button"
                    >
                      Excluir
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="categorias-empty">
                Nenhuma categoria cadastrada
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}