import React, { useState, useEffect } from "react";
import "./styles.css";
import { getCompetidores, deleteCompetidor, createCompetidor } from "../../services/CompetidorServices";
import { getCategorias } from "../../services/CategoriaServices";
import Janela from "../../components/janela/Janela";
import CompetidorForm from "../../components/competidoresForm/CompetidorForm";
import CompetidorList from "../../components/competidoresList/CompetidorList";

export default function Competidores() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [competidores, setCompetidores] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Carrega competidores e categorias simultaneamente
  const loadData = async () => {
    try {
      setLoading(true);
      const [competidoresData, categoriasData] = await Promise.all([
        getCompetidores(),
        getCategorias()
      ]);
      setCompetidores(competidoresData);
      setCategorias(categoriasData);
    } catch (err) {
      setError("Falha ao carregar dados");
      console.error("Erro:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { 
    loadData(); 
  }, []);

  const handleCreate = async (novoCompetidor) => {
    try {
      await createCompetidor(novoCompetidor);
      setIsModalOpen(false);
      await loadData();
    } catch (err) {
      setError("Falha ao criar competidor");
      console.error("Erro:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteCompetidor(id);
      await loadData();
    } catch (err) {
      setError("Falha ao excluir competidor");
      console.error("Erro:", err);
    }
  };

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>Erro: {error}</div>;

  return (
    <div className="competidores-container">
      <h1>Gerenciamento de Competidores</h1>
      
      <button 
        className="create-button"
        onClick={() => setIsModalOpen(true)}
      >
        Criar Novo Competidor
      </button>

      <CompetidorList 
        competidores={competidores} 
        categorias={categorias}
        onDelete={handleDelete} 
      />

      <Janela 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title="Cadastrar Competidor"
      >
        <CompetidorForm 
          onSubmit={handleCreate} 
          categorias={categorias} 
        />
      </Janela>
    </div>
  );
}