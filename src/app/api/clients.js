import api from './api'

export const getClients = () => api.get("/clients");
export const getClientById = (id) => api.get(`/clients/${id}`);
export const createClient = (data) => 
    api.post("/clients", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });   


export const updateClient = (id, data) => 
   api.put(`/clients/${id}`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });   



export const deleteClient = (id) => api.delete(`/clients/${id}`);