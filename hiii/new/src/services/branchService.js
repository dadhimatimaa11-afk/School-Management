import api from "./api";

// Get all branches
export const getBranches = () => api.get("/branches");

// Create branch
export const createBranch = (data) => api.post("/branches", data);

// Update branch
export const updateBranch = (id, data) => api.put(`/branches/${id}`, data);

// Delete branch
export const deleteBranch = (id) => api.delete(`/branches/${id}`);
