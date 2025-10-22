import api from "./api";
export const getLinks = () => api.get("/links");
export const getLinkById = (id) => api.get(`/links/${id}`); 
export const createLink = (data) => api.post("/links", data,
    {
       headers: { "Content-Type": "multipart/form-data" }, 
    });  
export const updateLink = (id, data) => api.put(`/links/${id}`, data,
    {
       headers: { "Content-Type": "multipart/form-data" }, 
    });
export const deleteLink = (id) => api.delete(`/links/${id}`);
