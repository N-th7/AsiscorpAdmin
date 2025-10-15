import api from './api'

export const getContacts = () => api.get("/contacts");
export const getContactById = (id) => api.get(`/contacts/${id}`);
export const createContact = (data) => api.post("/contacts", data);   
export const updateContact = (id, data) => api.put(`/contacts/${id}`, data);
export const deleteContact = (id) => api.delete(`/contacts/${id}`);