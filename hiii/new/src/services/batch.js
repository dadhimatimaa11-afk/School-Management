import api from "./api";

export const getBatches = async () => (await api.get("/batches")).data;
export const addBatch = async (payload) => (await api.post("/batches", payload)).data;
export const updateBatch = async (id, payload) => (await api.put(`/batches/${id}`, payload)).data;
export const deleteBatch = async (id) => (await api.delete(`/batches/${id}`)).data;
export const assignStudentToBatch = async (batchId, studentId) =>
  (await api.post("/batches/assign", { batchId, studentId })).data;
