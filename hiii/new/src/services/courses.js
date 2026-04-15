import api from "./api";

export const getCourses = async () => (await api.get("/courses")).data;
export const addCourse = async (payload) => (await api.post("/courses", payload)).data;
export const updateCourse = async (id, payload) => (await api.put(`/courses/${id}`, payload)).data;
export const deleteCourse = async (id) => (await api.delete(`/courses/${id}`)).data;
