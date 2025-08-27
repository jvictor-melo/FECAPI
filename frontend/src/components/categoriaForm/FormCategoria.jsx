import React, { useState, useEffect } from "react";
import "./styles.css";

export default function CategoriaForm({ onSubmit, categoriaEditando, onCancel }) {
  const [nome, setNome] = useState("");
  const [condicoes, setCondicoes] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if(categoriaEditando) {
      setNome(categoriaEditando.nome || "");
      setCondicoes(categoriaEditando.condicoes || "");
    } else {
      setNome("");
      setCondicoes("");
    }
  }, [categoriaEditando])

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!nome.trim()) {
      setError("O nome é obrigatório");
      return;
    }
    
    if (!condicoes.trim()) {
      setError("As condições são obrigatórias");
      return;
    }

    setError("");
    onSubmit({ nome, condicoes });
    
    if (!categoriaEditando) {
      setNome("");
      setCondicoes("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="categoria-form">
      <div className="form-group">
        <label>Nome:</label>
        <input
          placeholder="Nome da categoria"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label>Condições:</label>
        <textarea
          placeholder="Descreva as condições desta categoria"
          value={condicoes}
          onChange={(e) => setCondicoes(e.target.value)}
          required
        />
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="form-buttons">
        <button type="submit" className="submit-button">
          {categoriaEditando ? 'Atualizar' : 'Salvar'}
        </button>
        
        {categoriaEditando && (
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