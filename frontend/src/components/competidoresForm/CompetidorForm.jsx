import React, { useState, useEffect } from "react";
import "./styles.css";

export default function CompetidorForm({ onSubmit, categorias, competidorEditando, onCancel }) {
  const [nome, setNome] = useState("");
  const [id_categoria, setIdCategoria] = useState(categorias[0]?.id || "");
  const [error, setError] = useState("");

  useEffect(() => {
    if(competidorEditando) {
      setNome(competidorEditando.nome || "");
      setIdCategoria(competidorEditando.id_categoria || "");
    } else {
      setNome("");
      setIdCategoria(categorias[0]?.id_categoria || "");
    }
  }, [competidorEditando, categorias])

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!nome.trim()) {
      setError("O nome é obrigatório");
      return;
    }
    
    if (!id_categoria) {
      setError("Selecione uma categoria");
      return;
    }

    setError("");

    const idCategoriaNumber = Number(id_categoria);
    console.log('ID da categoria convertido:', idCategoriaNumber);
    
    onSubmit({ nome, id_categoria: idCategoriaNumber });
    
    if (!competidorEditando) {
      setNome("");
      setIdCategoria("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="competidor-form">
      <div className="form-group">
        <label>Nome:</label>
        <input
          placeholder="Nome do competidor"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label>Categoria:</label>
        <select
          value={id_categoria}
          onChange={(e) => setIdCategoria(e.target.value)}
          required
        >
          <option value="">Selecione uma categoria</option>
          {categorias && categorias.map(categoria => (
            <option key={categoria.id} value={categoria.id}>
              {categoria.nome}
            </option>
          ))}
        </select>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="form-buttons">
        <button type="submit" className="submit-button">
          {competidorEditando ? 'Atualizar' : 'Salvar'}
        </button>
        
        {competidorEditando && (
          <button 
            type="button" 
            onClick={onCancel}
            className="cancel-button"
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}
// testar se ficou melhor com o botao de cancelar