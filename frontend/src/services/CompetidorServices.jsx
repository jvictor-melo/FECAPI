

// src/services/categoriaService.js
const API_URL = "http://localhost:3030/competidores";

export async function getCompetidores() {
    const res = await fetch(API_URL);
    return res.json();
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
    
    const response = await fetch('http://localhost:3030/competidores', {
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

export async function updateCompetidor(id, data) {
    const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });
    return res.json();
}

export async function deleteCompetidor(id) {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
}
