import api from './api'

export const getClients = () => api.get("/clients");
export const getClientById = (id) => api.get(`/clients/${id}`);
export const createClient = (data) => 
    api.post("/clients", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });   


export const updateClient = async (id, data, isFormData = false) => {
  const config = {
    headers: {
      "Content-Type": isFormData ? "multipart/form-data" : "application/json",
    },
    withCredentials: true,
  };

  if (isFormData) {
    data.append("_method", "PUT"); 
    return await apu.post(`/clients/${id}`, data, config);
  }

  return await api.put(`/clients/${id}`, data, config);
};

export const deleteClient = (id) => api.delete(`/clients/${id}`);