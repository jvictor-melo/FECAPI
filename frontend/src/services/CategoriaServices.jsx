// src/services/categoriaService.js
const API_URL = "http://localhost:3030/categoria";

export async function getCategorias() {
    const res = await fetch(API_URL);
    return res.json();
}

export async function createCategoria(data) {
    const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });
    return res.json();
}

export async function updateCategoria(id, data) {
    const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });
    return res.json();
}

export async function deleteCategoria(id) {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
}
