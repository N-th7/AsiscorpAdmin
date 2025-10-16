import api from "./api";

export const getCertifications = () => api.get("/certifications");
export const getCertificationById = (id) => api.get(`/certifications/${id}`);   
export const createCertification = (data) => api.post("/certifications", data);
export const updateCertification = (id, data) => api.put(`/certifications/${id}`, data);
export const deleteCertification = (id) => api.delete(`/certifications/${id}`);
