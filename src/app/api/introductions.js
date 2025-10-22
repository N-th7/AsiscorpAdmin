import api from "./api";

export const getIntroductions = () => api.get("/introductions");
export const getIntroductionById = (id) => api.get(`/introductions/${id}`);
export const getIntroductionByName = (name) => api.get(`/introductions/name/${name}`);
export const createIntroduction = (data) => api.post("/introductions", data);   
export const updateIntroduction = (id, data) => api.put(`/introductions/${id}`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });