import api from "./api";

export const getInvoices = async () => (await api.get("/invoices")).data;
export const addInvoice = async (payload) => (await api.post("/invoices", payload)).data;
export const updateInvoice = async (id, payload) => (await api.put(`/invoices/${id}`, payload)).data;
export const deleteInvoice = async (id) => (await api.delete(`/invoices/${id}`)).data;
