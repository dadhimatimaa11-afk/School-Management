import api from "./api";

export const getSalaries = async () => (await api.get("/salaries")).data;
export const addSalary = async (payload) => (await api.post("/salaries", payload)).data;
export const updateSalary = async (id, payload) => (await api.put(`/salaries/${id}`, payload)).data;
export const deleteSalary = async (id) => (await api.delete(`/salaries/${id}`)).data;
