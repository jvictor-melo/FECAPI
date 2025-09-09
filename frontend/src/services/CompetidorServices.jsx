// src/services/categoriaService.js
const API_URL = "http://localhost:3030/competidores";

// vou da uma organizada aq

export async function getCompetidores() {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error('erro ao buscar competidores');
    return await res.json();
  } catch (error) {
    console.error("erro no getCompetidores:", error);
  }
}

export async function getCompetidorById(id) {
    try {
        const res = await fetch(`${API_URL}/${id}`);
        if (!res.ok) throw new Error('erro ao buscar competidor por id');
        return await res.json();
    } catch (error) {
        console.error("erro no getCompetidorById:", error);
        throw error;
    }
}

/*
export async function createCompetidor(data) {
    const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });
    return res.json();
}*/

export async function createCompetidor(competidorData) {
  try {
    console.log('Enviando dados para o servidor:', competidorData);
    
    const response = await fetch(`${API_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nome: competidorData.nome,
        id_categoria: Number(competidorData.id_categoria)
      })
    });

    console.log('Resposta do servidor:', response);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Erro na resposta:', errorData);
      throw new Error(errorData.error || 'Erro ao criar competidor');
    }

    return await response.json();
  } catch (error) {
    console.error('Erro completo na requisição:', error);
    throw error;
  }
}
 // coloquei so um try e catch aq
export async function updateCompetidor(id, data) {
  try{
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('erro atualizar competidor');
      return await res.json();
    } catch (error) {
      console.error("erro no updateCompetidor:", error);
      throw error;
    }
}
// mesma coisa q fiz em cima
export async function deleteCompetidor(id) {
    try {
        const res = await fetch(`${API_URL}/${id}`, { 
            method: "DELETE" 
        });
        if (!res.ok) throw new Error('erro ao deletar competidor');
        return await res.json();
    } catch (error) {
        console.error("erro no deleteCompetidor:", error);
        throw error;
    }
}

// validar a categoria pae chama
export async function validarCategoria(id_categoria) {
    try {
        if (!id_categoria || isNaN(Number(id_categoria))) {
            console.error('ID de categoria inválido:', id_categoria);
            return false;
        }

        const response = await fetch(`http://localhost:3030/categoria/${id_categoria}`);
         if (response.status === 404) {
            return false;
        }
        
        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }
        
        if (!response.ok) return false;
        const categoria = await response.json();
        return categoria !== null;
    } catch (error) {
        console.error('erro ao validar categoria:', error);
        return false;
    }
}