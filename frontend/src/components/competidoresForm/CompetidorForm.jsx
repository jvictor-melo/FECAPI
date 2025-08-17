import React, { useState } from "react";

export default function CompetidorForm({ onSubmit, categorias }) {
  const [nome, setNome] = useState("");
  const [id_categoria, setIdCategoria] = useState(categorias[0]?.id || "");
  const [error, setError] = useState("");

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
    onSubmit({ nome, id_categoria: Number(id_categoria) });
    setNome("");
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
          {categorias.map(categoria => (
            <option key={categoria.id} value={categoria.id}>
              {categoria.nome}
            </option>
          ))}
        </select>
      </div>

      {error && <div className="error-message">{error}</div>}

      <button type="submit" className="submit-button">
        Salvar
      </button>
    </form>
  );
}