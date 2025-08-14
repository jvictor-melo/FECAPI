import React, { useState, useEffect } from 'react';
//import api from "../../App"
import Janela from '../../components/janela/Janela';
import CategoriaForm from "../../components/categoriaForm/FormCategoria";
import CategoriaList from "../../components/categoriaList/ListCategoria";
import { getCategorias, createCategoria, deleteCategoria } from "../../services/CategoriaServices";
//import CrudForm from "../../components/formCrud/CrudForm";



export default function Categoria() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [categorias, setCategorias] = useState([]);

  const loadData = async () => {
    const data = await getCategorias();
    setCategorias(data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCreate = async (novaCategoria) => {
    await createCategoria(novaCategoria);
    setIsModalOpen(false);
    loadData();
  };

  const handleDelete = async (id) => {
    await deleteCategoria(id);
    loadData();
  };



    return (
        <div>
            <button onClick={() => setIsModalOpen(true)}>
                Criar Categorias
            </button>

            <CategoriaList categorias={categorias} onDelete={handleDelete} />


            <Janela isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                        <CategoriaForm onSubmit={handleCreate} />
            </Janela>
        </div>
    );
};