// src/services/notasService.js
const API_URL = "http://localhost:3030/notas";

export async function getNotas() {
    const res = await fetch(API_URL);
    return res.json();
}

export async function createNota(data) {
    const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });
    return res.json();
}

export async function updateNota(id, data) {
    const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });
    return res.json();
}

export async function deleteNota(id) {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
}
