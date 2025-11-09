import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE || 'http://localhost:4000/api',
    timeout: 8000,
    headers: { 'Content-Type': 'application/json' }
});

export const getAllSolicitudes = () => api.get('/solicitudes');
export const getSolicitudes = (id) => api.get(`/solicitudes/${id}`);
export const createSolicitud = (payload) => api.post('/solicitudes', payload);
export const updateSolicitud = (id, payload) => api.put(`/solicitudes/${id}`, payload);
export const deleteSolicitud = (id) => api.delete(`/solicitudes/${id}`);

export default api;