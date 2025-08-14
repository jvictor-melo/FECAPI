import React, { useState, useEffect } from "react";
import { getCompetidores, deleteCompetidor, createCompetidor } from "../../services/CompetidorServices";
import Janela from "../../components/janela/Janela";
import CompetidorForm from "../../components/competidoresForm/CompetidorForm";
import CompetidorList from "../../components/competidoresList/CompetidorList";

export default function Competidores() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [competidores, setCompetidores] = useState([]);

  const loadData = async () => setCompetidores(await getCompetidores());

  useEffect(() => { loadData(); }, []);

  const handleCreate = async (novoCompetidor) => {
    await createCompetidor(novoCompetidor);
    setIsModalOpen(false);
    loadData();
  };

  return (
    <div>
      <button onClick={() => setIsModalOpen(true)}>Criar Competidor</button>
      <CompetidorList competidores={competidores} onDelete={deleteCompetidor} />
      <Janela isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <CompetidorForm onSubmit={handleCreate} />
      </Janela>
    </div>
  );
}
