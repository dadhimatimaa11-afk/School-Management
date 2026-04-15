import api from "./api";

export const getAccessRoles = async () => (await api.get("/access")).data;
export const addAccessRole = async (payload) => (await api.post("/access", payload)).data;
export const updateAccessRole = async (id, payload) => (await api.put(`/access/${id}`, payload)).data;
export const deleteAccessRole = async (id) => (await api.delete(`/access/${id}`)).data;
