import api from './api';

const eventService = {
    getAll: async () => {
        return await api.get('/events');
    },

    getById: async (id) => {
        return await api.get(`/events/${id}`);
    },

    // Admin only
    create: async (data) => {
        return await api.post('/events', data);
    },

    update: async (id, data) => {
        return await api.put(`/events/${id}`, data);
    },

    delete: async (id) => {
        return await api.delete(`/events/${id}`);
    }
};

export default eventService;
