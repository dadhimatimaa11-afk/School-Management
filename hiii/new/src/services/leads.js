import api from "./api";


// 📊 Chart data (conversion report)
export const getLeadsChartData = async () => {
  const { data } = await api.get("/leads/reports/conversion");
  return data;
};

// 📄 Get all leads (for table + summary cards)
export const getLeads = async () => {
  const { data } = await api.get("/leads");
  return data;
};

// ➕ Create new lead
export const createLead = async (leadData) => {
  const { data } = await api.post("/leads", leadData);
  return data;
};

// ✏️ Update lead status
export const updateLeadStatus = async (id, status) => {
  const { data } = await api.patch(`/leads/${id}/status`, { status });
  return data;
};

// 📅 Update follow-up info
export const updateFollowUp = async (id, followUpDate, remarks) => {
  const { data } = await api.patch(`/leads/${id}/followup`, { followUpDate, remarks });
  return data;
};

// 🔁 Convert lead → student
export const convertLeadToStudent = async (id, payload) => {
  const { data } = await api.post(`/leads/${id}/convert`, payload);
  return data;
};

