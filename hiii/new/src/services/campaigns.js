import api from "./api";

export const getCampaigns = async () => (await api.get("/campaigns")).data;
export const addCampaign = async (payload) => (await api.post("/campaigns", payload)).data;
export const updateCampaign = async (id, payload) => (await api.put(`/campaigns/${id}`, payload)).data;
export const deleteCampaign = async (id) => (await api.delete(`/campaigns/${id}`)).data;
