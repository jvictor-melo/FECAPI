import { api } from "../api/Api";

export async function getCompetidores() {
  const res = await api.get("/competidores");
  return res.data;
}

export async function createCompetidor(data) {
  const res = await api.post("/competidores", data);
  return res.data;
}

export async function deleteCompetidor(id) {
  const res = await api.delete(`/competidores/${id}`);
  return res.data;
}
