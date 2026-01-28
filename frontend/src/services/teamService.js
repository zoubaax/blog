import api from './api';

const teamService = {
    getAll: async () => {
        return await api.get('/team');
    },

    getById: async (id) => {
        return await api.get(`/team/${id}`);
    },

    // Admin only
    create: async (data) => {
        return await api.post('/team', data);
    },

    update: async (id, data) => {
        return await api.put(`/team/${id}`, data);
    },

    delete: async (id) => {
        return await api.delete(`/team/${id}`);
    }
};

export default teamService;
